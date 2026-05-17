import { motion } from 'framer-motion';
import type { SajuResult } from '../utils/sajuCalculator';
import { getOhangDistribution, getDayMasterAnalysis, getDaewoonAnalysis } from '../utils/sajuCalculator';
import { OHANG_COLOR, CHEONGAN } from '../utils/constants';
import SajuChart from './SajuChart';
import AiAnalysis from './AiAnalysis';
import SinsalCard from './SinsalCard';
import FaqSection from './FaqSection';
import { Sparkles, Flame, Mountain, Wind, Droplets, Circle } from 'lucide-react';

interface SajuResultProps {
  result: SajuResult;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', bounce: 0.2, duration: 0.8 }
  },
};

const ohangIcons: Record<string, React.ReactNode> = {
  '목': <Wind className="w-5 h-5" />,
  '화': <Flame className="w-5 h-5" />,
  '토': <Mountain className="w-5 h-5" />,
  '금': <Circle className="w-5 h-5" />,
  '수': <Droplets className="w-5 h-5" />,
};

export default function SajuResult({ result }: SajuResultProps) {
  const ohangDist = getOhangDistribution(result);
  const maxOhang = Math.max(...Object.values(ohangDist));
  const dayMasterAnalysis = getDayMasterAnalysis(result.dayMaster, result.dayMasterOhang);
  const daewoonAnalysis = getDaewoonAnalysis(result.gender, CHEONGAN.indexOf(result.dayMaster as typeof CHEONGAN[number]));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* User Info Header */}
      {result.name && (
        <motion.div variants={itemVariants} className="text-center">
          <h3 className="text-2xl md:text-3xl font-serif font-bold gold-gradient-text">
            {result.name} 님의 사주
          </h3>
        </motion.div>
      )}

      {/* Calendar Info */}
      <motion.div variants={itemVariants} className="flex justify-center">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-gold-500/20 bg-ink-800/50">
          {result.isLunar ? (
            <>
              <span className="text-xs text-gold-400 font-medium">음력</span>
              <span className="text-xs text-ink-400">
                {result.lunarDate?.year}년 {result.lunarDate?.month}월 {result.lunarDate?.day}일
              </span>
              <span className="text-xs text-ink-600">→</span>
              <span className="text-xs text-gold-300">
                양력 {result.birthDate.getFullYear()}년 {result.birthDate.getMonth() + 1}월 {result.birthDate.getDate()}일
              </span>
            </>
          ) : (
            <>
              <span className="text-xs text-gold-400 font-medium">양력</span>
              <span className="text-xs text-gold-300">
                {result.birthDate.getFullYear()}년 {result.birthDate.getMonth() + 1}월 {result.birthDate.getDate()}일
              </span>
            </>
          )}
        </div>
      </motion.div>

      {/* Chart */}
      <motion.div variants={itemVariants}>
        <SajuChart result={result} />
      </motion.div>

      {/* Analysis Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Day Master Analysis */}
        <motion.div variants={itemVariants} className="glass-card p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <h4 className="text-gold-300 font-serif font-bold">일간 분석</h4>
              <span className="text-ink-500 text-xs tracking-wider">DAY MASTER ANALYSIS</span>
            </div>
          </div>
          <p className="text-ink-200 leading-relaxed text-sm md:text-base">
            {dayMasterAnalysis}
          </p>
        </motion.div>

        {/* Daewoon Analysis */}
        <motion.div variants={itemVariants} className="glass-card p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-crimson-500/20 to-crimson-600/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-crimson-600" />
            </div>
            <div>
              <h4 className="text-gold-300 font-serif font-bold">대운 흐름</h4>
              <span className="text-ink-500 text-xs tracking-wider">LUCK CYCLE</span>
            </div>
          </div>
          <p className="text-ink-200 leading-relaxed text-sm md:text-base">
            {daewoonAnalysis}
          </p>
        </motion.div>
      </div>

      {/* Ohang Distribution */}
      <motion.div variants={itemVariants} className="glass-card p-6 md:p-8 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h4 className="text-gold-300 font-serif font-bold text-lg">오행 분포</h4>
          <span className="text-ink-500 text-xs tracking-wider">FIVE ELEMENTS DISTRIBUTION</span>
        </div>

        <div className="space-y-5">
          {Object.entries(ohangDist).map(([ohang, value]) => {
            const percentage = maxOhang > 0 ? (value / maxOhang) * 100 : 0;
            const color = OHANG_COLOR[ohang];
            
            return (
              <div key={ohang} className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ 
                    backgroundColor: `${color}15`,
                    border: `1px solid ${color}30`,
                  }}
                >
                  <span style={{ color }}>{ohangIcons[ohang]}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-ink-300 text-sm font-medium">{ohang}</span>
                    <span className="text-ink-500 text-xs">{value.toFixed(1)}</span>
                  </div>
                  <div className="h-2.5 bg-ink-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                      className="h-full rounded-full relative"
                      style={{ 
                        backgroundColor: color,
                        boxShadow: `0 0 10px ${color}50`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ohang Summary */}
        <div className="mt-6 pt-6 border-t border-gold-500/10">
          <p className="text-ink-400 text-sm text-center leading-relaxed">
            당신의 사주에서 <span className="text-gold-400 font-medium">{Object.entries(ohangDist).sort((a, b) => b[1] - a[1])[0][0]}</span>의 기운이 가장 강하게 나타나며, 
            <span className="text-gold-400 font-medium"> {result.dayMasterOhang}</span> 일간의 특성과 함께 
            독특한 운명의 흐름을 만들어갑니다.
          </p>
        </div>
      </motion.div>

      {/* AI Analysis */}
      <motion.div variants={itemVariants}>
        <AiAnalysis result={result} />
      </motion.div>

      {/* 신살 분석 */}
      <motion.div variants={itemVariants}>
        <SinsalCard result={result} />
      </motion.div>

      {/* FAQ */}
      <motion.div variants={itemVariants}>
        <FaqSection />
      </motion.div>

      {/* Footer Note */}
      <motion.div variants={itemVariants} className="text-center pb-8">
        <p className="text-ink-600 text-xs">
          본 사주 풀이는 참고용이며, 정확한 절기 기준의 전문 사주 해석은 전문가와 상담하시기 바랍니다.
        </p>
      </motion.div>
    </motion.div>
  );
}
