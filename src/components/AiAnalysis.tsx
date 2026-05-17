import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Loader2,
  Brain,
  AlertCircle,
  User,
  Briefcase,
  Heart,
  Shield,
  Compass,
  RefreshCw,
  ChevronRight,
  Wand2,
} from 'lucide-react';
import type { SajuResult } from '../utils/sajuCalculator';
import { generateSajuAnalysis, isAiAvailable, type AiAnalysisResult } from '../utils/aiAnalysis';

interface AiAnalysisProps {
  result: SajuResult;
}

const sectionMeta: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  '성격과 기질': {
    icon: <User className="w-5 h-5" />,
    color: '#d4af37',
    bg: 'rgba(212, 175, 55, 0.08)',
  },
  '직업과 재물': {
    icon: <Briefcase className="w-5 h-5" />,
    color: '#60a5fa',
    bg: 'rgba(96, 165, 250, 0.08)',
  },
  '인연과 결혼': {
    icon: <Heart className="w-5 h-5" />,
    color: '#f87171',
    bg: 'rgba(248, 113, 113, 0.08)',
  },
  '건강과 운수': {
    icon: <Shield className="w-5 h-5" />,
    color: '#4ade80',
    bg: 'rgba(74, 222, 128, 0.08)',
  },
  '조언과 길방': {
    icon: <Compass className="w-5 h-5" />,
    color: '#a78bfa',
    bg: 'rgba(167, 139, 250, 0.08)',
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.2, duration: 0.6 } },
};

function formatContent(text: string): string {
  return text
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\s+/gm, '')
    .trim();
}

export default function AiAnalysis({ result }: AiAnalysisProps) {
  const [analysis, setAnalysis] = useState<AiAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasRequested, setHasRequested] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!isAiAvailable()) {
      setError('Gemini API 키가 설정되지 않았습니다. 관리자에게 문의하세요.');
      return;
    }
    setLoading(true);
    setError(null);
    setHasRequested(true);
    try {
      const data = await generateSajuAnalysis(result);
      setAnalysis(data);
    } catch (err: any) {
      setError(err.message || 'AI 해석 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [result]);

  if (!hasRequested && !loading && !analysis) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 md:p-10 max-w-3xl mx-auto text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-crimson-500/5 pointer-events-none" />
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-500/15 to-gold-600/5 border border-gold-500/20 flex items-center justify-center mx-auto mb-5 relative z-10"
        >
          <Wand2 className="w-9 h-9 text-gold-400" />
        </motion.div>
        <h3 className="text-2xl font-serif font-bold gold-gradient-text mb-3 relative z-10">
          AI 심층 명리 해석
        </h3>
        <p className="text-ink-400 text-sm mb-8 max-w-md mx-auto leading-relaxed relative z-10">
          Google Gemini AI가 천간지지의 조합을 심층 분석하여
          <br className="hidden md:block" />
          당신만을 위한 맞춤형 운세를 들려드립니다
        </p>
        <motion.button
          onClick={handleGenerate}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn-primary inline-flex items-center gap-2.5 px-8 relative z-10"
        >
          <Sparkles className="w-4 h-4" />
          <span className="tracking-wider">AI 해석 받기</span>
        </motion.button>
        {error && (
          <div className="mt-5 flex items-center gap-2 text-crimson-500 text-sm justify-center relative z-10 bg-crimson-500/10 px-4 py-2 rounded-lg inline-flex">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </motion.div>
    );
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card p-12 max-w-3xl mx-auto text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-crimson-500/5 pointer-events-none" />
        <div className="relative z-10">
          <div className="relative w-16 h-16 mx-auto mb-5">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-gold-500/20 border-t-gold-500"
            />
            <Loader2 className="absolute inset-0 w-8 h-8 text-gold-400 m-auto animate-spin" />
          </div>
          <p className="text-gold-300 font-serif text-lg mb-2">명리 해석 중입니다</p>
          <p className="text-ink-500 text-sm">천간지지의 신비로운 조합을 분석하고 있습니다</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card p-8 max-w-3xl mx-auto text-center"
      >
        <div className="w-14 h-14 rounded-full bg-crimson-500/10 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-7 h-7 text-crimson-500" />
        </div>
        <h3 className="text-gold-300 font-serif font-bold text-xl mb-2">해석을 불러올 수 없습니다</h3>
        <p className="text-ink-400 text-sm mb-6 max-w-sm mx-auto">{error}</p>
        <motion.button
          onClick={handleGenerate}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gold-500/30 text-gold-400 text-sm hover:bg-gold-500/10 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>다시 시도</span>
        </motion.button>
      </motion.div>
    );
  }

  if (!analysis) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-3xl mx-auto space-y-5"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="glass-card p-5 flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/10 border border-gold-500/20 flex items-center justify-center shrink-0">
          <Brain className="w-5 h-5 text-gold-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-serif font-bold text-gold-200">AI 심층 명리 해석</h3>
          <p className="text-ink-500 text-xs">Google Gemini 기반 맞춤형 분석 결과</p>
        </div>
        <button
          onClick={handleGenerate}
          className="shrink-0 w-8 h-8 rounded-lg border border-ink-700 flex items-center justify-center text-ink-500 hover:text-gold-400 hover:border-gold-500/30 transition-colors"
          title="다시 생성"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </motion.div>

      {/* Sections */}
      <div className="space-y-4">
        {analysis.sections.map((section, idx) => {
          const meta = sectionMeta[section.title] || {
            icon: <ChevronRight className="w-5 h-5" />,
            color: '#d4af37',
            bg: 'rgba(212, 175, 55, 0.08)',
          };
          const paragraphs = formatContent(section.content).split('\n\n').filter(Boolean);

          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-card overflow-hidden relative"
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px]"
                style={{ backgroundColor: meta.color }}
              />

              {/* Section header */}
              <div
                className="px-5 py-4 flex items-center gap-3"
                style={{ backgroundColor: meta.bg }}
              >
                <span style={{ color: meta.color }}>{meta.icon}</span>
                <span className="text-gold-100 font-bold text-sm tracking-wide">
                  {section.title}
                </span>
              </div>

              {/* Content */}
              <div className="px-5 py-5 space-y-3.5">
                {paragraphs.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-ink-200 leading-[1.85] text-[15px]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer hint */}
      <motion.div variants={itemVariants} className="text-center py-2">
        <p className="text-ink-600 text-xs">
          본 해석은 AI 생성 결과이며 참고용입니다. 중요한 결정은 전문 명리사와 상담하세요.
        </p>
      </motion.div>
    </motion.div>
  );
}
