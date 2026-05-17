import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ChevronDown, Sun, Moon, Type } from 'lucide-react';

interface SajuFormProps {
  onSubmit: (data: {
    name: string;
    year: number;
    month: number;
    day: number;
    hour: number;
    gender: 'male' | 'female';
    isLunar: boolean;
  }) => void;
}

export default function SajuForm({ onSubmit }: SajuFormProps) {
  const [name, setName] = useState('');
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(12);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [isLunar, setIsLunar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, year, month, day, hour, gender, isLunar });
  };

  const years = Array.from({ length: 100 }, (_, i) => 1930 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="glass-card p-8 md:p-12 max-w-2xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-serif font-bold gold-gradient-text mb-3">
          사주 정보 입력
        </h2>
        <p className="text-ink-400 text-sm">
          생년월일과 태어난 시를 정확히 입력해 주세요
        </p>
      </div>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-gold-400 text-xs mb-2 font-medium tracking-wider">
            NAME
          </label>
          <div className="relative">
            <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/60" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              className="input-field pl-10"
              maxLength={10}
            />
          </div>
        </div>

        {/* Calendar Type */}
        <div>
          <label className="block text-gold-400 text-xs mb-2 font-medium tracking-wider">
            CALENDAR
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setIsLunar(false)}
              className={`relative flex items-center justify-center gap-2 py-3 rounded-lg border transition-all duration-300 ${
                !isLunar
                  ? 'border-gold-500/50 bg-gold-500/10 text-gold-300'
                  : 'border-ink-700 bg-ink-800/50 text-ink-400 hover:border-ink-600'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span className="font-medium">양력</span>
              {!isLunar && (
                <motion.div
                  layoutId="calendarIndicator"
                  className="absolute inset-0 rounded-lg border-2 border-gold-500/30"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsLunar(true)}
              className={`relative flex items-center justify-center gap-2 py-3 rounded-lg border transition-all duration-300 ${
                isLunar
                  ? 'border-gold-500/50 bg-gold-500/10 text-gold-300'
                  : 'border-ink-700 bg-ink-800/50 text-ink-400 hover:border-ink-600'
              }`}
            >
              <Moon className="w-4 h-4" />
              <span className="font-medium">음력</span>
              {isLunar && (
                <motion.div
                  layoutId="calendarIndicator"
                  className="absolute inset-0 rounded-lg border-2 border-gold-500/30"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Birth Date */}
        <div className="grid grid-cols-3 gap-4">
          <div className="relative">
            <label className="block text-gold-400 text-xs mb-2 font-medium tracking-wider">
              YEAR
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/60" />
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="input-field pl-10 appearance-none cursor-pointer"
              >
                {years.map((y) => (
                  <option key={y} value={y} className="bg-ink-800">
                    {y}년
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/60 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-gold-400 text-xs mb-2 font-medium tracking-wider">
              MONTH
            </label>
            <div className="relative">
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="input-field appearance-none cursor-pointer"
              >
                {months.map((m) => (
                  <option key={m} value={m} className="bg-ink-800">
                    {m}월
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/60 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-gold-400 text-xs mb-2 font-medium tracking-wider">
              DAY
            </label>
            <div className="relative">
              <select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="input-field appearance-none cursor-pointer"
              >
                {days.map((d) => (
                  <option key={d} value={d} className="bg-ink-800">
                    {d}일
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/60 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Hour */}
        <div>
          <label className="block text-gold-400 text-xs mb-2 font-medium tracking-wider">
            HOUR
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/60" />
            <select
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              className="input-field pl-10 appearance-none cursor-pointer"
            >
              {hours.map((h) => (
                <option key={h} value={h} className="bg-ink-800">
                  {h.toString().padStart(2, '0')}:00
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/60 pointer-events-none" />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gold-400 text-xs mb-2 font-medium tracking-wider">
            GENDER
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`relative flex items-center justify-center gap-2 py-3 rounded-lg border transition-all duration-300 ${
                gender === 'male'
                  ? 'border-gold-500/50 bg-gold-500/10 text-gold-300'
                  : 'border-ink-700 bg-ink-800/50 text-ink-400 hover:border-ink-600'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="font-medium">남성</span>
              {gender === 'male' && (
                <motion.div
                  layoutId="genderIndicator"
                  className="absolute inset-0 rounded-lg border-2 border-gold-500/30"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`relative flex items-center justify-center gap-2 py-3 rounded-lg border transition-all duration-300 ${
                gender === 'female'
                  ? 'border-gold-500/50 bg-gold-500/10 text-gold-300'
                  : 'border-ink-700 bg-ink-800/50 text-ink-400 hover:border-ink-600'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="font-medium">여성</span>
              {gender === 'female' && (
                <motion.div
                  layoutId="genderIndicator"
                  className="absolute inset-0 rounded-lg border-2 border-gold-500/30"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary w-full mt-8"
        >
          <span className="relative z-10 text-lg tracking-widest">사주 풀이 보기</span>
        </motion.button>
      </div>
    </motion.form>
  );
}
