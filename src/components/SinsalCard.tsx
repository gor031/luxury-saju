import { motion } from 'framer-motion';
import type { SajuResult } from '../utils/sajuCalculator';
import { Sparkles } from 'lucide-react';

interface SinsalCardProps {
  result: SajuResult;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.2, duration: 0.6 } },
};

export default function SinsalCard({ result }: SinsalCardProps) {
  if (!result.sinsal || result.sinsal.length === 0) return null;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      className="glass-card p-6 md:p-8 max-w-3xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-gold-400" />
        </div>
        <div>
          <h4 className="text-gold-300 font-serif font-bold">신살 분석</h4>
          <span className="text-ink-500 text-xs tracking-wider">AUSPICIOUS & INAUSPICIOUS STARS</span>
        </div>
      </div>

      <div className="grid gap-4">
        {result.sinsal.map((s, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="p-4 rounded-xl border border-gold-500/10 bg-ink-800/30"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gold-400 font-bold text-sm">{s.name}</span>
              <span className="text-ink-500 text-xs">({s.hanja})</span>
              <div className="flex gap-1 ml-auto">
                {s.branches.map((b, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-gold-500/10 text-gold-400"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-ink-300 text-sm leading-relaxed">{s.meaning}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
