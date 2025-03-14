import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, Play, Pause, RefreshCw, Plus, 
  Trash2, ChevronDown, MessageSquare, Bot,
  Brain, Notebook as Robot
} from 'lucide-react';

interface Task {
  id: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('agent-1');
  const [agentPersonality, setAgentPersonality] = useState('professional');
  const [apiKey, setApiKey] = useState('');
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      description: newTask,
      status: 'pending'
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Robot className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold">McManus Dashboard</h1>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-800"
            >
              Exit Demo
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Task Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Input */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Describe your task..."
                  className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleAddTask}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Task</span>
                </button>
              </div>
            </div>

            {/* Task List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Tasks</h2>
              <div className="space-y-4">
                {tasks.map(task => (
                  <div key={task.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium">{task.description}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Status: {task.status}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {task.status === 'pending' && (
                          <button className="text-green-600 hover:text-green-700">
                            <Play className="w-5 h-5" />
                          </button>
                        )}
                        {task.status === 'running' && (
                          <button className="text-yellow-600 hover:text-yellow-700">
                            <Pause className="w-5 h-5" />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    {task.result && (
                      <div className="mt-4 bg-gray-50 rounded p-3">
                        <p className="text-sm">{task.result}</p>
                      </div>
                    )}
                  </div>
                ))}
                {tasks.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    No tasks yet. Add your first task above!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Configuration */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Agent Configuration</h2>
                <button
                  onClick={() => setIsConfigOpen(!isConfigOpen)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ChevronDown className={`w-5 h-5 transform ${isConfigOpen ? 'rotate-180' : ''} transition-transform`} />
                </button>
              </div>
              
              {isConfigOpen && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Agent
                    </label>
                    <select
                      value={selectedAgent}
                      onChange={(e) => setSelectedAgent(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="agent-1">Agent 1</option>
                      <option value="agent-2">Agent 2</option>
                      <option value="agent-3">Agent 3</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Personality
                    </label>
                    <select
                      value={agentPersonality}
                      onChange={(e) => setAgentPersonality(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="professional">Professional</option>
                      <option value="friendly">Friendly</option>
                      <option value="technical">Technical</option>
                      <option value="creative">Creative</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      API Key
                    </label>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your API key"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Agent Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Agent Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-medium">-</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Time</span>
                  <span className="font-medium">-</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-2 border rounded-lg px-4 py-2 hover:bg-gray-50">
                  <RefreshCw className="w-5 h-5" />
                  <span>Reset</span>
                </button>
                <button className="flex items-center justify-center space-x-2 border rounded-lg px-4 py-2 hover:bg-gray-50">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
                <button className="flex items-center justify-center space-x-2 border rounded-lg px-4 py-2 hover:bg-gray-50">
                  <MessageSquare className="w-5 h-5" />
                  <span>Chat</span>
                </button>
                <button className="flex items-center justify-center space-x-2 border rounded-lg px-4 py-2 hover:bg-gray-50">
                  <Brain className="w-5 h-5" />
                  <span>Train</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;