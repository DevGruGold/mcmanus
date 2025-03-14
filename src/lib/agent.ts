import axios from 'axios';
import puppeteer from 'puppeteer-core';

const GROK_API_KEY = 'xai-KPLYqQWc9fRNeH0kVH5Wkav4UZXFY997CeBZT4Da8oPSQMH6Q7r0R5hZSaZvvDz8iAK9gOZVpXlyoqo6';
const BROWSER_USE_API = 'https://api.browser-use.com';

export class McManusAgent {
  private browser: any;
  private page: any;
  private context: any = {};
  private sessionId: string | null = null;

  constructor(private agentId: string) {}

  async initialize() {
    try {
      // Start a new browser-use session
      const response = await axios.post(`${BROWSER_USE_API}/session/create`, {
        agentId: this.agentId,
        capabilities: {
          headless: true,
          stealth: true,
          proxy: 'auto'
        }
      });

      this.sessionId = response.data.sessionId;
      
      // Connect to the browser instance
      this.browser = await puppeteer.connect({
        browserWSEndpoint: `${BROWSER_USE_API}/session/${this.sessionId}/ws`,
        defaultViewport: { width: 1920, height: 1080 }
      });

      this.page = await this.browser.newPage();
      
      // Set up session monitoring
      this._startSessionHeartbeat();
      
    } catch (error) {
      console.error('Failed to initialize browser session:', error);
      throw error;
    }
  }

  private _startSessionHeartbeat() {
    if (!this.sessionId) return;
    
    setInterval(async () => {
      try {
        await axios.post(`${BROWSER_USE_API}/session/${this.sessionId}/heartbeat`);
      } catch (error) {
        console.error('Heartbeat failed:', error);
      }
    }, 30000); // Every 30 seconds
  }

  async processTask(task: string) {
    if (!this.sessionId || !this.page) {
      throw new Error('Browser session not initialized');
    }

    try {
      // Get task analysis from Grok
      const grokResponse = await axios.post('https://api.grok.ai/v1/analyze', {
        task,
        context: this.context
      }, {
        headers: {
          'Authorization': `Bearer ${GROK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const { steps, browserActions } = grokResponse.data;

      // Execute browser actions
      if (browserActions && browserActions.length > 0) {
        for (const action of browserActions) {
          // Report action to browser-use for monitoring
          await axios.post(`${BROWSER_USE_API}/session/${this.sessionId}/action`, {
            type: action.type,
            url: action.url,
            selector: action.selector,
            text: action.text
          });

          switch (action.type) {
            case 'navigate':
              await this.page.goto(action.url, {
                waitUntil: 'networkidle0',
                timeout: 30000
              });
              break;
            case 'click':
              await this.page.waitForSelector(action.selector);
              await this.page.click(action.selector);
              break;
            case 'type':
              await this.page.waitForSelector(action.selector);
              await this.page.type(action.selector, action.text);
              break;
            case 'extract':
              await this.page.waitForSelector(action.selector);
              const data = await this.page.evaluate((selector: string) => {
                return document.querySelector(selector)?.textContent;
              }, action.selector);
              this.context[action.key] = data;
              break;
            case 'screenshot':
              const screenshot = await this.page.screenshot({
                fullPage: true,
                encoding: 'base64'
              });
              this.context.lastScreenshot = screenshot;
              break;
          }
        }
      }

      // Update context with task results
      this.context.lastTask = {
        task,
        completed: true,
        timestamp: new Date().toISOString()
      };

      return {
        success: true,
        message: 'Task completed successfully',
        context: this.context
      };

    } catch (error) {
      console.error('Error processing task:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        context: this.context
      };
    }
  }

  async cleanup() {
    if (this.sessionId) {
      try {
        // Properly close the browser-use session
        await axios.post(`${BROWSER_USE_API}/session/${this.sessionId}/close`);
      } catch (error) {
        console.error('Error closing browser session:', error);
      }
    }
    
    if (this.browser) {
      await this.browser.close();
    }
  }
}