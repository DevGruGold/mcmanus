import { useState, useEffect } from 'react';
import { AgentPool } from '../lib/agentPool';

const agentPool = new AgentPool(3); // Maximum 3 concurrent agents

export function useAgent(subscription: 'starter' | 'professional' | 'enterprise') {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const maxAgents = {
    starter: 1,
    professional: 3,
    enterprise: Infinity
  }[subscription];

  useEffect(() => {
    const initializeAgents = async () => {
      try {
        for (let i = 0; i < maxAgents && i < 3; i++) {
          await agentPool.initializeAgent(`agent-${i + 1}`);
        }
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize agents');
      }
    };

    initializeAgents();

    return () => {
      agentPool.cleanup();
    };
  }, [maxAgents]);

  const executeTask = async (task: string) => {
    if (!isInitialized) {
      throw new Error('Agent pool not initialized');
    }

    const agent = await agentPool.getAvailableAgent();
    if (!agent) {
      throw new Error('No agents available');
    }

    try {
      const result = await agent.processTask(task);
      return result;
    } finally {
      agentPool.releaseAgent(agent.agentId);
    }
  };

  return {
    isInitialized,
    error,
    executeTask
  };
}