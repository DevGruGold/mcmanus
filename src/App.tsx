import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Brain, Clock, Code, Command, Cpu, Globe, CloudLightning as Lightning, Notebook as Robot } from 'lucide-react';
import Dashboard from './pages/Dashboard';

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <Icon className="w-8 h-8 text-indigo-600 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function LandingPage() {
  const navigate = useNavigate();
  
  const handlePurchase = (amount: number) => {
    const revolutLink = `https://revolut.me/devgrugold/${amount}`;
    window.open(revolutLink, '_blank');
  };

  const startFreeTrial = () => {
    navigate('/demo');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <header className="bg-indigo-900 text-white">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Robot className="w-8 h-8" />
            <span className="text-2xl font-bold">McManus</span>
          </div>
          <div className="space-x-6">
            <a href="#features" className="hover:text-indigo-200">Features</a>
            <a href="#pricing" className="hover:text-indigo-200">Pricing</a>
            <button 
              onClick={startFreeTrial}
              className="bg-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors"
            >
              Start Free Trial
            </button>
          </div>
        </nav>
        
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-bold mb-6">Your AI Workforce, Always Ready</h1>
          <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
            Meet McManus - The AI agent that works like a full-time employee, without breaks or limitations. Complete complex tasks through intelligent automation.
          </p>
          <div className="space-y-4">
            <button 
              onClick={startFreeTrial}
              className="bg-white text-indigo-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Start 7-Day Free Trial
            </button>
            <p className="text-indigo-200 text-sm">No credit card required</p>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Why Choose McManus?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Clock}
            title="24/7 Availability"
            description="Works around the clock without breaks, ensuring your tasks are completed any time, day or night."
          />
          <FeatureCard
            icon={Brain}
            title="Intelligent Processing"
            description="Advanced AI capabilities to handle complex tasks and make informed decisions."
          />
          <FeatureCard
            icon={Lightning}
            title="Instant Scaling"
            description="Add or remove AI agents instantly based on your workload demands."
          />
          <FeatureCard
            icon={Code}
            title="Technical Tasks"
            description="Proficient in coding, data analysis, and technical problem-solving."
          />
          <FeatureCard
            icon={Globe}
            title="Global Operations"
            description="Operate across different time zones and languages seamlessly."
          />
          <FeatureCard
            icon={Cpu}
            title="Advanced Automation"
            description="Automate repetitive tasks with precision and reliability."
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Simple, Transparent Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="border rounded-xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <div className="mb-4">
                <p className="text-4xl font-bold">$299<span className="text-lg text-gray-600">/mo</span></p>
                <p className="text-indigo-600">7-day free trial</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><Command className="w-5 h-5 text-indigo-600 mr-2" /> 1 AI Agent</li>
                <li className="flex items-center"><Command className="w-5 h-5 text-indigo-600 mr-2" /> 40 hours/week</li>
                <li className="flex items-center"><Command className="w-5 h-5 text-indigo-600 mr-2" /> Basic tasks</li>
                <li className="flex items-center"><Command className="w-5 h-5 text-indigo-600 mr-2" /> Email support</li>
              </ul>
              <button 
                onClick={startFreeTrial}
                className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition-colors"
              >
                Start Free Trial
              </button>
            </div>

            {/* Professional Plan */}
            <div className="border rounded-xl p-8 bg-indigo-50 hover:shadow-lg transition-shadow relative">
              <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1 rounded-bl-xl rounded-tr-xl">
                Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Professional</h3>
              <div className="mb-4">
                <p className="text-4xl font-bold">$799<span className="text-lg text-gray-600">/mo</span></p>
                <p className="text-indigo-600">7-day free trial</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><Command className="w-5 h-5 text-indigo-600 mr-2" /> 3 AI Agents</li>
                <li className="flex items-center"><Command className="w-5 h-5 text-indigo-600 mr-2" /> Unlimited hours</li>
                <li className="flex items-center"><Command className="w-5 h-5 text-indigo-600 mr-2" /> Advanced tasks</li>
                <li className="flex items-center"><Command className="w-5 h-5 text-indigo-600 mr-2" /> Priority support</li>
              </ul>
              <button 
                onClick={startFreeTrial}
                className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition-colors"
              >
                Start Free Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="border rounded-xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <p className="text-4xl font-bold mb-6">Custom</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><Command className="w-5 h-5 text-indigo-600 mr-2" /> Unlimited Agents</li>
                <li className="flex items-center"><Command className="w-5 h-5 text-indigo-600 mr-2" /> Custom solutions</li>
                <li className="flex items-center"><Command className="w-5 h-5 text-indigo-600 mr-2" /> API access</li>
                <li className="flex items-center"><Command className="w-5 h-5 text-indigo-600 mr-2" /> 24/7 support</li>
              </ul>
              <button 
                onClick={() => window.location.href = 'mailto:sales@mcmanus.ai'}
                className="w-full border-2 border-indigo-600 text-indigo-600 py-2 rounded-full hover:bg-indigo-50 transition-colors"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Robot className="w-6 h-6" />
              <span className="text-xl font-bold">McManus</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-indigo-400">Privacy</a>
              <a href="#" className="hover:text-indigo-400">Terms</a>
              <a href="#" className="hover:text-indigo-400">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            © {new Date().getFullYear()} McManus AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/demo" element={<Dashboard />} />
    </Routes>
  );
}

export default App;