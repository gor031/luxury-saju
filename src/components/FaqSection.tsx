import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: '사주는 운명이 정해져 있다는 뜻인가요?',
    a: '아닙니다. 사주는 타고난 "경향성"과 "가능성"을 보여주는 것이지, 절대적으로 정해진 운명이 아닙니다. 같은 사주를 가진 사람이라도 환경, 노력, 선택에 따라 삶이 달라집니다. 사주는 자기 이해와 방향 설정을 위한 참고 도구로 활용하는 것이 좋습니다.',
  },
  {
    q: '양력과 음력 중 어떤 것을 기준으로 해야 하나요?',
    a: '태어난 실제 날짜를 기준으로 합니다. 주민등록증에 기재된 생년월일이 양력이면 양력, 음력이면 음력을 선택하세요. 1980년대 이후 출생자는 대부분 양력 기준입니다.',
  },
  {
    q: '출생 시간을 모르면 어떻게 하나요?',
    a: '출생 시간을 모르면 "00:00" 또는 "시각 모름"을 선택하시면 됩니다. 이 경우 시주(時柱) 없이 년·월·일의 세 기둥(三柱)만으로 분석합니다. 시주는 말년운과 자녀운에 관련되므로, 가능하면 부모님이나 출생증명서를 통해 확인하시는 것이 좋습니다.',
  },
  {
    q: '같은 날, 같은 시간에 태어난 사람은 운명이 같나요?',
    a: '사주팔자가 동일하더라도 운명은 다릅니다. 사주는 기본적인 "기질"과 "흐름"을 보여주지만, 태어난 환경, 성장 배경, 교육, 개인의 선택과 노력에 따라 실제 삶은 크게 달라집니다.',
  },
  {
    q: '개인정보는 안전한가요?',
    a: '입력하신 생년월일시는 사주 계산 용도로만 사용되며 서버에 저장되지 않습니다. 모든 계산은 브라우저에서 이루어지고, AI 해석 또한 입력 즉시 처리 후 데이터를 남기지 않습니다.',
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 md:p-8 max-w-3xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/10 flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-gold-400" />
        </div>
        <div>
          <h4 className="text-gold-300 font-serif font-bold">자주 묻는 질문</h4>
          <span className="text-ink-500 text-xs tracking-wider">FAQ</span>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-gold-500/10 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full px-5 py-4 flex items-center justify-between text-left"
            >
              <span className="text-gold-200 text-sm font-medium pr-4">{faq.q}</span>
              {openIdx === idx ? (
                <ChevronUp className="w-4 h-4 text-gold-500 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gold-500 shrink-0" />
              )}
            </button>
            <AnimatePresence>
              {openIdx === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 pt-1 border-t border-gold-500/10">
                    <p className="text-ink-300 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* 면책조항 */}
      <div className="mt-6 pt-6 border-t border-gold-500/10">
        <p className="text-ink-500 text-xs text-center leading-relaxed">
          본 서비스는 전통 명리학을 기반으로 한 참고 정보이며, 의료·법률·재정 상담을 대체하지 않습니다.
          중요한 결정은 전문가와 상의하십시오. 본 사주 풀이는 참고용이며, 정확한 절기 기준의 전문 사주 해석은 전문가와 상담하시기 바랍니다.
        </p>
      </div>
    </motion.div>
  );
}
