import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Brain, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import type { SajuResult } from '../utils/sajuCalculator';
import { generateSajuAnalysis, isAiAvailable, type AiAnalysisResult } from '../utils/aiAnalysis';

interface AiAnalysisProps {
  result: SajuResult;
}

export default function AiAnalysis({ result }: AiAnalysisProps) {
  const [analysis, setAnalysis] = useState<AiAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
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

  useEffect(() => {
    // 자동 생성 (선택 사항 - 주석 처리)
    // handleGenerate();
  }, [handleGenerate]);

  if (!hasRequested && !loading && !analysis) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 max-w-3xl mx-auto text-center"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/10 flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-gold-400" />
        </div>
        <h3 className="text-xl font-serif font-bold gold-gradient-text mb-2">
          AI 명리 해석
        </h3>
        <p className="text-ink-400 text-sm mb-6 max-w-md mx-auto">
          Google Gemini (gemma-4-31b-it) AI가 당신의 사주를 심층 분석하여
          성격, 직업, 인연, 건강, 조언을 제공합니다.
        </p>
        <motion.button
          onClick={handleGenerate}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI 해석 받기</span>
        </motion.button>
        {error && (
          <div className="mt-4 flex items-center gap-2 text-crimson-600 text-sm justify-center">
            <AlertCircle className="w-4 h-4" />
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
        className="glass-card p-12 max-w-3xl mx-auto text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-full border-2 border-gold-500/30 border-t-gold-500 mx-auto mb-4"
        />
        <Loader2 className="w-6 h-6 text-gold-400 mx-auto mb-2 animate-spin" />
        <p className="text-gold-300 font-serif">AI가 사주를 분석하는 중입니다...</p>
        <p className="text-ink-500 text-xs mt-2">천간지지의 신비로운 조합을 해석하고 있습니다</p>
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
        <AlertCircle className="w-10 h-10 text-crimson-600 mx-auto mb-3" />
        <h3 className="text-gold-300 font-serif font-bold mb-2">분석 불가</h3>
        <p className="text-ink-400 text-sm mb-4">{error}</p>
        <button
          onClick={handleGenerate}
          className="text-gold-400 text-sm hover:text-gold-300 transition-colors"
        >
          다시 시도
        </button>
      </motion.div>
    );
  }

  if (!analysis) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-4"
    >
      {/* Header */}
      <div className="glass-card p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/10 flex items-center justify-center shrink-0">
          <Brain className="w-6 h-6 text-gold-400" />
        </div>
        <div>
          <h3 className="text-lg font-serif font-bold text-gold-300">AI 명리 해석</h3>
          <p className="text-ink-500 text-xs">Powered by Google Gemini (gemma-4-31b-it)</p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {analysis.sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card overflow-hidden"
          >
            <button
              onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-gold-500/10 text-gold-400 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-gold-200 font-medium">{section.title}</span>
              </div>
              {expandedSection === idx ? (
                <ChevronUp className="w-4 h-4 text-gold-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gold-500" />
              )}
            </button>
            <AnimatePresence>
              {expandedSection === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2 border-t border-gold-500/10">
                    <p className="text-ink-200 leading-relaxed text-sm whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Full Text Toggle */}
      <div className="text-center pt-4">
        <button
          onClick={() => setExpandedSection(expandedSection === -1 ? 0 : -1)}
          className="text-gold-500/60 text-xs hover:text-gold-400 transition-colors"
        >
          {expandedSection === -1 ? '접기' : '전체 해석 펼쳐보기'}
        </button>
      </div>

      {expandedSection === -1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-6"
        >
          <pre className="text-ink-300 text-sm whitespace-pre-wrap leading-relaxed font-sans">
            {analysis.content}
          </pre>
        </motion.div>
      )}
    </motion.div>
  );
}
