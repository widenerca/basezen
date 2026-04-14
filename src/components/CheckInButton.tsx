import { useState, useCallback } from 'react';
import { useAccount, useSendTransaction, useConnect, useDisconnect } from 'wagmi';
import { parseEther } from 'viem';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, Loader2, Wallet as WalletIcon, LogOut } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// Example Builder Code (8 bytes / 16 hex chars)
const BUILDER_CODE = '0x426173655a656e30'; 

export function CheckInButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { sendTransaction, isPending, isSuccess, error } = useSendTransaction();
  const [isHovered, setIsHovered] = useState(false);

  const handleCheckIn = useCallback(() => {
    if (!address) return;
    sendTransaction({
      to: address,
      value: parseEther('0'),
      data: BUILDER_CODE as `0x${string}`,
    });
  }, [address, sendTransaction]);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md">
      {!isConnected ? (
        <div className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/20 shadow-2xl shadow-blue-500/10">
          <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <WalletIcon className="w-8 h-8 text-white" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Connect to Base</h2>
            <p className="text-slate-500 text-sm max-w-[240px]">
              Connect your wallet to start your daily mindfulness check-in on Base.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {connector.name === 'Coinbase Wallet' && <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-[10px] text-blue-600 font-bold">C</div>}
                Connect {connector.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group"
          >
            <div className={cn(
              "absolute -inset-4 rounded-[40px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl transition-opacity duration-500",
              isHovered ? "opacity-100" : "opacity-0"
            )} />

            <button
              onClick={handleCheckIn}
              disabled={isPending || isSuccess}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={cn(
                "relative flex flex-col items-center justify-center w-64 h-64 rounded-[48px] transition-all duration-500",
                "bg-white border border-slate-200 shadow-xl",
                "hover:border-blue-400/50 hover:shadow-blue-500/10 hover:-translate-y-1",
                "disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:translate-y-0",
                isSuccess && "border-green-500/50 bg-green-50/50"
              )}
            >
              <AnimatePresence mode="wait">
                {isPending ? (
                  <motion.div
                    key="loading"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-widest">Processing</span>
                  </motion.div>
                ) : isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-sm font-medium text-green-600 uppercase tracking-widest">Checked In</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-500">
                      <Sparkles className="w-10 h-10 text-slate-400 group-hover:text-blue-500 transition-colors duration-500" />
                    </div>
                    <div className="text-center">
                      <span className="block text-xl font-semibold text-slate-900">Check In</span>
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Daily Pulse</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-12 left-0 right-0 text-center text-xs text-red-500 font-medium"
              >
                {error.message.includes('User rejected') ? 'Transaction cancelled' : 'Something went wrong'}
              </motion.p>
            )}
          </motion.div>

          <button 
            onClick={() => disconnect()}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            <LogOut className="w-3 h-3" />
            Disconnect {address?.slice(0, 6)}...{address?.slice(-4)}
          </button>
        </div>
      )}
    </div>
  );
}
