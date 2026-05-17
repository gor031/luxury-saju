import { motion } from 'framer-motion';
import type { SajuResult } from '../utils/sajuCalculator';
import { OHANG_COLOR } from '../utils/constants';

interface SajuChartProps {
  result: SajuResult;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', bounce: 0.3, duration: 0.8 }
  },
};

export default function SajuChart({ result }: SajuChartProps) {
  const pillars = [
    { label: '시주', sub: 'Hour', data: result.hourPillar },
    { label: '일주', sub: 'Day', data: result.dayPillar },
    { label: '월주', sub: 'Month', data: result.monthPillar },
    { label: '년주', sub: 'Year', data: result.yearPillar },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-3xl mx-auto"
    >
      {/* Title */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h3 className="text-xl font-serif font-bold text-gold-300 mb-1">사주 팔자</h3>
        <p className="text-ink-500 text-xs tracking-widest">FOUR PILLARS OF DESTINY</p>
      </motion.div>

      {/* Chart Grid */}
      <div className="grid grid-cols-4 gap-3 md:gap-4">
        {pillars.map((pillar) => (
          <motion.div key={pillar.label} variants={itemVariants} className="flex flex-col gap-2">
            {/* Label */}
            <div className="text-center mb-1">
              <span className="text-gold-400 text-sm font-bold">{pillar.label}</span>
              <span className="block text-ink-600 text-[10px] tracking-wider">{pillar.sub}</span>
            </div>

            {/* Stem (천간) */}
            <div className="pillar-box py-4 md:py-6 relative group">
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${OHANG_COLOR[pillar.data.stemOhang]}15 0%, transparent 70%)`,
                }}
              />
              <span
                className="stem-text relative z-10"
                style={{ color: OHANG_COLOR[pillar.data.stemOhang] }}
              >
                {pillar.data.stem}
              </span>
              <span className="text-xs text-ink-500 mt-1 relative z-10">
                {pillar.data.stemOhang}
              </span>
              <span className="text-[10px] text-gold-500/60 mt-1 relative z-10">
                {pillar.data.sibseong}
              </span>
            </div>

            {/* Branch (지지) */}
            <div className="pillar-box py-4 md:py-6 relative group">
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${OHANG_COLOR[pillar.data.branchOhang]}15 0%, transparent 70%)`,
                }}
              />
              <span
                className="branch-text relative z-10"
                style={{ color: OHANG_COLOR[pillar.data.branchOhang] }}
              >
                {pillar.data.branch}
              </span>
              <span className="text-xs text-ink-500 mt-1 relative z-10">
                {pillar.data.branchOhang}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Day Master Highlight */}
      <motion.div
        variants={itemVariants}
        className="mt-8 text-center"
      >
        <div className="inline-flex flex-col items-center px-8 py-4 rounded-xl border border-gold-500/20 bg-gradient-to-b from-gold-500/5 to-transparent">
          <span className="text-ink-500 text-xs tracking-widest mb-1">일간 (日主)</span>
          <span
            className="text-3xl font-serif font-bold"
            style={{ 
              color: OHANG_COLOR[result.dayMasterOhang],
              textShadow: `0 0 20px ${OHANG_COLOR[result.dayMasterOhang]}40`
            }}
          >
            {result.dayMaster}
          </span>
          <span className="text-sm text-gold-400 mt-1">{result.dayMasterOhang}의 기운</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
