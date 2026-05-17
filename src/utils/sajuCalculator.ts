import {
  CHEONGAN,
  JIJI,
  getTimeBranch,
  getSibseong,
  CHEONGAN_OHANG,
  JIJI_OHANG,
  JIJI_INTERNAL_STEM,
} from './constants';
import { Lunar } from 'lunar-javascript';

export interface SajuPillar {
  stem: string;      // 천간
  branch: string;    // 지지
  hanja: string;     // 한자
  stemOhang: string; // 천간 오행
  branchOhang: string; // 지지 오행
  sibseong: string;  // 십성 (일간 기준)
}

export interface SajuResult {
  yearPillar: SajuPillar;
  monthPillar: SajuPillar;
  dayPillar: SajuPillar;
  hourPillar: SajuPillar;
  dayMaster: string; // 일간 (日主)
  dayMasterOhang: string;
  gender: 'male' | 'female';
  birthDate: Date;
  name: string;
  isLunar: boolean;
  lunarDate?: { year: number; month: number; day: number };
}

// 60갑자 인덱스로부터 한자 반환
function getGabjaHanja(index: number): string {
  const CHEONGAN_HANJA = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const JIJI_HANJA = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  return CHEONGAN_HANJA[index % 10] + JIJI_HANJA[index % 12];
}

// 윤년 체크
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// 해당 연도의 1월 1일부터 주어진 날짜까지의 일수
function getDayOfYear(year: number, month: number, day: number): number {
  const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let days = 0;
  for (let i = 0; i < month - 1; i++) {
    days += daysInMonth[i];
  }
  return days + day;
}

// 1900년 1월 1일부터 주어진 날짜까지의 총 일수
function getTotalDaysFrom1900(year: number, month: number, day: number): number {
  let totalDays = 0;
  for (let y = 1900; y < year; y++) {
    totalDays += isLeapYear(y) ? 366 : 365;
  }
  totalDays += getDayOfYear(year, month, day) - 1; // 1월 1일이 0일이 되도록
  return totalDays;
}

// 년주 계산
function getYearPillar(year: number): { stem: string; branch: string; index: number } {
  const index = (year - 4) % 60;
  return {
    stem: CHEONGAN[index % 10],
    branch: JIJI[index % 12],
    index,
  };
}

// 월주 계산 (간략화: 양력 기준)
function getMonthPillar(year: number, month: number): { stem: string; branch: string; index: number } {
  const yearStemIndex = (year - 4) % 10;
  
  // 월지: 寅월을 1월로 간주 (month + 1)
  const branchIndex = (month + 1) % 12;
  
  // 월간: 연간에 따른 시작 월간
  // 갑기→병, 을경→무, 병신→경, 정임→임, 무계→갑
  const monthStemStartMap: Record<number, number> = {
    0: 2,  // 갑 → 병(2)
    1: 4,  // 을 → 무(4)
    2: 6,  // 병 → 경(6)
    3: 8,  // 정 → 임(8)
    4: 0,  // 무 → 갑(0)
    5: 2,  // 기 → 병(2)
    6: 4,  // 경 → 무(4)
    7: 6,  // 신 → 경(6)
    8: 8,  // 임 → 임(8)
    9: 0,  // 계 → 갑(0)
  };
  
  const monthStemIndex = (monthStemStartMap[yearStemIndex] + (month - 1)) % 10;
  const gabjaIndex = monthStemIndex * 6 + branchIndex; // 근사값
  
  return {
    stem: CHEONGAN[monthStemIndex],
    branch: JIJI[branchIndex],
    index: gabjaIndex % 60,
  };
}

// 일주 계산
function getDayPillar(year: number, month: number, day: number): { stem: string; branch: string; index: number } {
  // 1900년 1월 1일 = 경자일 (index 36)
  const baseIndex = 36;
  const totalDays = getTotalDaysFrom1900(year, month, day);
  const index = (baseIndex + totalDays) % 60;
  
  return {
    stem: CHEONGAN[index % 10],
    branch: JIJI[index % 12],
    index,
  };
}

// 시주 계산
function getHourPillar(dayStem: string, hour: number): { stem: string; branch: string; index: number } {
  const branch = getTimeBranch(hour);
  const branchIndex = JIJI.indexOf(branch as typeof JIJI[number]);
  
  const dayStemIndex = CHEONGAN.indexOf(dayStem as typeof CHEONGAN[number]);
  
  // 시천간: 일간에 따른 시작 천간
  // 갑기→갑(0), 을경→병(2), 병신→무(4), 정임→경(6), 무계→임(8)
  const hourStemStartMap: Record<number, number> = {
    0: 0,  // 갑
    1: 2,  // 을
    2: 4,  // 병
    3: 6,  // 정
    4: 8,  // 무
    5: 0,  // 기
    6: 2,  // 경
    7: 4,  // 신
    8: 6,  // 임
    9: 8,  // 계
  };
  
  const hourStemIndex = (hourStemStartMap[dayStemIndex] + branchIndex) % 10;
  const gabjaIndex = hourStemIndex * 6 + branchIndex;
  
  return {
    stem: CHEONGAN[hourStemIndex],
    branch,
    index: gabjaIndex % 60,
  };
}

// 음력 → 양력 변환
function lunarToSolar(year: number, month: number, day: number): { year: number; month: number; day: number } {
  try {
    const lunar = Lunar.fromYmd(year, month, day);
    const solar = lunar.getSolar();
    return {
      year: solar.getYear(),
      month: solar.getMonth(),
      day: solar.getDay(),
    };
  } catch {
    return { year, month, day };
  }
}

export function calculateSaju(
  year: number,
  month: number,
  day: number,
  hour: number,
  gender: 'male' | 'female',
  name: string = '',
  isLunar: boolean = false
): SajuResult {
  let calcYear = year;
  let calcMonth = month;
  let calcDay = day;
  let lunarDate: { year: number; month: number; day: number } | undefined;

  if (isLunar) {
    lunarDate = { year, month, day };
    const solar = lunarToSolar(year, month, day);
    calcYear = solar.year;
    calcMonth = solar.month;
    calcDay = solar.day;
  }

  const yearPillar = getYearPillar(calcYear);
  const monthPillar = getMonthPillar(calcYear, calcMonth);
  const dayPillar = getDayPillar(calcYear, calcMonth, calcDay);
  const hourPillar = getHourPillar(dayPillar.stem, hour);

  const createPillar = (
    p: { stem: string; branch: string; index: number },
    dayMaster: string
  ): SajuPillar => ({
    stem: p.stem,
    branch: p.branch,
    hanja: getGabjaHanja(p.index),
    stemOhang: CHEONGAN_OHANG[p.stem] || '',
    branchOhang: JIJI_OHANG[p.branch] || '',
    sibseong: getSibseong(dayMaster, p.stem),
  });

  const dayMaster = dayPillar.stem;

  return {
    yearPillar: createPillar(yearPillar, dayMaster),
    monthPillar: createPillar(monthPillar, dayMaster),
    dayPillar: createPillar(dayPillar, dayMaster),
    hourPillar: createPillar(hourPillar, dayMaster),
    dayMaster,
    dayMasterOhang: CHEONGAN_OHANG[dayMaster] || '',
    gender,
    birthDate: new Date(calcYear, calcMonth - 1, calcDay, hour),
    name,
    isLunar,
    lunarDate,
  };
}

// 오행 분포 계산
export function getOhangDistribution(result: SajuResult): Record<string, number> {
  const distribution: Record<string, number> = { '목': 0, '화': 0, '토': 0, '금': 0, '수': 0 };
  
  const pillars = [result.yearPillar, result.monthPillar, result.dayPillar, result.hourPillar];
  
  for (const p of pillars) {
    distribution[p.stemOhang] = (distribution[p.stemOhang] || 0) + 1;
    distribution[p.branchOhang] = (distribution[p.branchOhang] || 0) + 1;
    
    // 지지 내 천간 (장생십이운)
    const internalStems = JIJI_INTERNAL_STEM[p.branch] || [];
    for (const stem of internalStems) {
      const oh = CHEONGAN_OHANG[stem];
      if (oh) distribution[oh] = (distribution[oh] || 0) + 0.5;
    }
  }
  
  return distribution;
}

// 일주 분석
export function getDayMasterAnalysis(dayMaster: string, dayMasterOhang: string): string {
  const analysisMap: Record<string, string> = {
    '갑': '큰 나무(큰목)로서 곧고 힘찬 기운을 지닌 당신. 리더십과 추진력이 강하며, 주변 사람들에게 의지가 되는 존재입니다.',
    '을': '작은 나무(소목)로서 유연하고 섬세한 기운을 지닌 당신. 적응력이 뛰어나며, 주변 환경과 조화를 이루는 능력이 탁월합니다.',
    '병': '태양의 불(태양화)로서 밝고 따뜻한 기운을 지닌 당신. 열정적이고 명랑하며, 주변에 긍정적인 에너지를 전달합니다.',
    '정': ' candle의 불(촛불화)로서 은은하고 정교한 기운을 지닌 당신. 섬세한 감성과 예술적 재능이 뛰어납니다.',
    '무': '산의 토(산토)로서 든든하고 포용력 있는 기운을 지닌 당신. 신뢰할 수 있으며, 현실적이고 실용적인 판단력을 가졌습니다.',
    '기': '밭의 토(평원토)로서 온화하고 부드러운 기운을 지닌 당신. 배려심이 깊고, 주변 사람들을 돌보는 데 능합니다.',
    '경': '큰 쇠(경금)로서 단단하고 예리한 기운을 지닌 당신. 의지가 강하고, 목표를 향해 묵묵히 나아가는 힘이 있습니다.',
    '신': '작은 쇠(신금)로서 정교하고 세련된 기운을 지닌 당신. 섬세한 손길과 완벽을 추구하는 성향이 특징입니다.',
    '임': '큰 물(대해수)로서 넓고 깊은 기운을 지닌 당신. 지혜롭고 포용력이 크며, 변화에 유연하게 대처합니다.',
    '계': '작은 물(세수)로서 맑고 고요한 기운을 지닌 당신. 직관력이 뛰어나고, 내면의 평화를 중요시합니다.',
  };
  
  return analysisMap[dayMaster] || `${dayMaster}(${dayMasterOhang})의 기운을 지닌 당신.`;
}

// 대운 분석 (간략화)
export function getDaewoonAnalysis(gender: 'male' | 'female', yearStemIndex: number): string {
  const isYangStem = yearStemIndex % 2 === 0;
  const isForward = (gender === 'male' && isYangStem) || (gender === 'female' && !isYangStem);
  
  return isForward
    ? '순행대운: 인생이 흐르는 물결을 따라 순조롭게 전진합니다. 기회가 찾아오면 적극적으로 잡으세요.'
    : '역행대운: 때로는 거슬러 올라가는 흐름을 경험합니다. 인내심을 가지고 내면의 성장에 집중하세요.';
}
