import { McManusAgent } from './agent';

export class AgentPool {
  private agents: Map<string, McManusAgent> = new Map();
  private availableAgents: string[] = [];
  private busyAgents: Set<string> = new Set();

  constructor(private maxAgents: number) {}

  async initializeAgent(agentId: string) {
    const agent = new McManusAgent(agentId);
    await agent.initialize();
    this.agents.set(agentId, agent);
    this.availableAgents.push(agentId);
  }

  async getAvailableAgent(): Promise<McManusAgent | null> {
    if (this.availableAgents.length === 0) {
      if (this.agents.size < this.maxAgents) {
        const newAgentId = `agent-${this.agents.size + 1}`;
        await this.initializeAgent(newAgentId);
      } else {
        return null;
      }
    }

    const agentId = this.availableAgents.shift()!;
    this.busyAgents.add(agentId);
    return this.agents.get(agentId)!;
  }

  releaseAgent(agentId: string) {
    if (this.busyAgents.has(agentId)) {
      this.busyAgents.delete(agentId);
      this.availableAgents.push(agentId);
    }
  }

  async cleanup() {
    for (const agent of this.agents.values()) {
      await agent.cleanup();
    }
    this.agents.clear();
    this.availableAgents = [];
    this.busyAgents.clear();
  }
}