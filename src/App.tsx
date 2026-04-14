import { OnchainProviders } from './components/OnchainProviders';
import { CheckInButton } from './components/CheckInButton';
import { motion } from 'motion/react';
import { Shield, Zap, Globe } from 'lucide-react';
import { ReactNode } from 'react';

export default function App() {
  return (
    <OnchainProviders>
      <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 h-20 border-b border-slate-200 bg-white/80 backdrop-blur-md z-50">
          <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
              </div>
              <span className="font-bold text-xl tracking-tight">Base Zen</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">History</a>
              <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Community</a>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Base Mainnet</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">On-Chain Consistency</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 max-w-3xl mx-auto leading-[1.1]">
                Your Daily Pulse on <span className="text-blue-600">Base</span>
              </h1>
              
              <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
                A minimalist ritual to record your presence. One click, one transaction, forever on the blockchain.
              </p>
            </motion.div>

            <CheckInButton />

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full max-w-5xl">
              <FeatureCard 
                icon={<Shield className="w-6 h-6 text-blue-500" />}
                title="Secure & Private"
                description="Your check-ins are recorded directly to your wallet address on Base."
              />
              <FeatureCard 
                icon={<Zap className="w-6 h-6 text-blue-500" />}
                title="Gas Efficient"
                description="Optimized for Base to ensure minimal gas costs for every check-in."
              />
              <FeatureCard 
                icon={<Globe className="w-6 h-6 text-blue-500" />}
                title="Open Standard"
                description="Uses Base Builder Codes for transparent attribution and ecosystem growth."
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 py-12 px-6 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2 opacity-50 grayscale">
              <div className="w-6 h-6 rounded bg-slate-900" />
              <span className="font-bold text-sm tracking-tight">Base Zen</span>
            </div>
            
            <div className="flex items-center gap-8 text-xs font-medium text-slate-400 uppercase tracking-widest">
              <a href="https://docs.base.org" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Documentation</a>
              <a href="https://base.org" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Base.org</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">GitHub</a>
            </div>
            
            <p className="text-xs text-slate-400">
              Built for the Base Ecosystem • 2026
            </p>
          </div>
        </footer>
      </div>
    </OnchainProviders>
  );
}

function FeatureCard({ icon, title, description }: { icon: ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 text-left space-y-4"
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 tracking-tight">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </motion.div>
  );
}
