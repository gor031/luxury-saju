import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SajuForm from './components/SajuForm';
import SajuResult from './components/SajuResult';
import { calculateSaju, type SajuResult as SajuResultType } from './utils/sajuCalculator';
import { ChevronLeft, Sparkles } from 'lucide-react';

function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            backgroundColor: i % 3 === 0 ? 'rgba(212, 175, 55, 0.3)' : 'rgba(139, 0, 0, 0.2)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function BackgroundPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900 to-ink-950" />
      
      {/* Radial glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-crimson-500/5 rounded-full blur-3xl" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Cloud pattern overlay */}
      <div className="absolute inset-0 cloud-pattern opacity-30" />
    </div>
  );
}

export default function App() {
  const [result, setResult] = useState<SajuResultType | null>(null);

  const handleFormSubmit = (data: {
    name: string;
    year: number;
    month: number;
    day: number;
    hour: number;
    gender: 'male' | 'female';
    isLunar: boolean;
  }) => {
    const sajuResult = calculateSaju(
      data.year,
      data.month,
      data.day,
      data.hour,
      data.gender,
      data.name,
      data.isLunar
    );
    setResult(sajuResult);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BackgroundPattern />
      <FloatingParticles />

      <div className="relative z-10">
        {/* Header */}
        <header className="pt-12 pb-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 rounded-full border border-gold-500/30 flex items-center justify-center"
              >
                <Sparkles className="w-6 h-6 text-gold-400" />
              </motion.div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-black gold-gradient-text tracking-wider mb-3">
              명리각
            </h1>
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/50" />
              <p className="text-gold-500/80 text-xs md:text-sm tracking-[0.3em] uppercase font-medium">
                Destiny & Fortune
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/50" />
            </div>
            <p className="text-ink-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
              천간지지의 신비로운 조화 속에서<br className="hidden md:block" />
              당신의 운명을 들여다보세요
            </p>
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="px-4 pb-16 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <SajuForm onSubmit={handleFormSubmit} />
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6">
                  <motion.button
                    onClick={handleReset}
                    whileHover={{ x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors text-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>다시 풀이하기</span>
                  </motion.button>
                </div>
                <SajuResult result={result} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="py-8 text-center border-t border-gold-500/10">
          <p className="text-ink-700 text-xs tracking-wider">
            명리각 - 사주 팔자 풀이
          </p>
        </footer>
      </div>
    </div>
  );
}
