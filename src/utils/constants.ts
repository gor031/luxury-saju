// 천간 (Heavenly Stems)
export const CHEONGAN = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'] as const;
export const CHEONGAN_HANJA = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const;

// 지지 (Earthly Branches)
export const JIJI = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'] as const;
export const JIJI_HANJA = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const;

// 오행 (Five Elements)
export const OHANG = ['목', '화', '토', '금', '수'] as const;
export const OHANG_COLOR: Record<string, string> = {
  '목': '#4ade80', // green
  '화': '#f87171', // red
  '토': '#fbbf24', // yellow
  '금': '#f3f4f6', // white/silver
  '수': '#60a5fa', // blue
};

// 천간 오행
export const CHEONGAN_OHANG: Record<string, string> = {
  '갑': '목', '을': '목',
  '병': '화', '정': '화',
  '무': '토', '기': '토',
  '경': '금', '신': '금',
  '임': '수', '계': '수',
};

// 지지 오행
export const JIJI_OHANG: Record<string, string> = {
  '자': '수', '축': '토', '인': '목', '묘': '목',
  '진': '토', '사': '화', '오': '화', '미': '토',
  '신': '금', '유': '금', '술': '토', '해': '수',
};

// 지지에 포함된 천간 (장생십이운)
export const JIJI_INTERNAL_STEM: Record<string, string[]> = {
  '자': ['임'],
  '축': ['계', '신', '기'],
  '인': ['갑', '병', '무'],
  '묘': ['을'],
  '진': ['을', '무', '계'],
  '사': ['병', '경', '무'],
  '오': ['정', '기'],
  '미': ['을', '정', '기'],
  '신': ['경', '임', '무'],
  '유': ['신'],
  '술': ['신', '정', '무'],
  '해': ['임', '갑'],
};

// 십성 (Ten Gods) - 일간 기준
export const SIBSEONG = ['비견', '겁재', '식신', '상관', '편재', '정재', '편인', '정인', '편관', '정관'] as const;

// 십성 관계 (일간 기준)
export function getSibseong(dayStem: string, targetStem: string): string {
  const dayIndex = CHEONGAN.indexOf(dayStem as typeof CHEONGAN[number]);
  const targetIndex = CHEONGAN.indexOf(targetStem as typeof CHEONGAN[number]);
  
  if (dayIndex === -1 || targetIndex === -1) return '';
  
  const diff = (targetIndex - dayIndex + 10) % 10;
  
  // 양음 (짝수: 양, 홀수: 음)
  const dayYinYang = dayIndex % 2 === 0; // true: 양
  const targetYinYang = targetIndex % 2 === 0;
  const sameYinYang = dayYinYang === targetYinYang;
  
  const sibseongMap: Record<number, [string, string]> = {
    0: ['비견', '비견'],
    1: ['겁재', '겁재'],
    2: ['식신', '상관'],
    3: ['상관', '식신'],
    4: ['편재', '정재'],
    5: ['정재', '편재'],
    6: ['편인', '정인'],
    7: ['정인', '편인'],
    8: ['편관', '정관'],
    9: ['정관', '편관'],
  };
  
  return sibseongMap[diff][sameYinYang ? 0 : 1];
}

// 시간 지지
export const TIME_BRANCHES = [
  { hour: 23, branch: '자', label: '자시 (23:00-01:00)' },
  { hour: 1, branch: '축', label: '축시 (01:00-03:00)' },
  { hour: 3, branch: '인', label: '인시 (03:00-05:00)' },
  { hour: 5, branch: '묘', label: '묘시 (05:00-07:00)' },
  { hour: 7, branch: '진', label: '진시 (07:00-09:00)' },
  { hour: 9, branch: '사', label: '사시 (09:00-11:00)' },
  { hour: 11, branch: '오', label: '오시 (11:00-13:00)' },
  { hour: 13, branch: '미', label: '미시 (13:00-15:00)' },
  { hour: 15, branch: '신', label: '신시 (15:00-17:00)' },
  { hour: 17, branch: '유', label: '유시 (17:00-19:00)' },
  { hour: 19, branch: '술', label: '술시 (19:00-21:00)' },
  { hour: 21, branch: '해', label: '해시 (21:00-23:00)' },
];

export function getTimeBranch(hour: number): string {
  for (const t of TIME_BRANCHES) {
    const endHour = (t.hour + 2) % 24;
    if (hour >= t.hour && hour < endHour) return t.branch;
    if (t.hour === 23 && (hour >= 23 || hour < 1)) return t.branch;
  }
  return '자';
}

// 60갑자 (Sexagenary Cycle)
export const GABJA: string[] = [];
for (let i = 0; i < 60; i++) {
  GABJA.push(CHEONGAN[i % 10] + JIJI[i % 12]);
}

export const GABJA_HANJA: string[] = [];
for (let i = 0; i < 60; i++) {
  GABJA_HANJA.push(CHEONGAN_HANJA[i % 10] + JIJI_HANJA[i % 12]);
}
