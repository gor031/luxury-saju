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

// 지장간 (地支藏干) - 지지 내부 천간 + 강도
export const JIJI_INTERNAL_STEM: Record<string, { stem: string; strength: string }[]> = {
  '자': [{ stem: '임', strength: '100%' }],
  '축': [{ stem: '기', strength: '60%' }, { stem: '신', strength: '30%' }, { stem: '계', strength: '10%' }],
  '인': [{ stem: '갑', strength: '60%' }, { stem: '병', strength: '30%' }, { stem: '무', strength: '10%' }],
  '묘': [{ stem: '을', strength: '100%' }],
  '진': [{ stem: '무', strength: '60%' }, { stem: '을', strength: '30%' }, { stem: '계', strength: '10%' }],
  '사': [{ stem: '병', strength: '60%' }, { stem: '무', strength: '30%' }, { stem: '경', strength: '10%' }],
  '오': [{ stem: '정', strength: '70%' }, { stem: '기', strength: '30%' }],
  '미': [{ stem: '기', strength: '60%' }, { stem: '정', strength: '30%' }, { stem: '을', strength: '10%' }],
  '신': [{ stem: '경', strength: '60%' }, { stem: '임', strength: '30%' }, { stem: '무', strength: '10%' }],
  '유': [{ stem: '신', strength: '100%' }],
  '술': [{ stem: '무', strength: '60%' }, { stem: '신', strength: '30%' }, { stem: '정', strength: '10%' }],
  '해': [{ stem: '임', strength: '70%' }, { stem: '갑', strength: '30%' }],
};

// 12운성 (十二運星) - 일간 기준 지지에서의 힘 상태
export const TWELVE_UNSEONG: Record<string, string[]> = {
  '갑': ['해', '자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술'],
  '을': ['오', '사', '진', '묘', '인', '축', '자', '해', '술', '유', '신', '미'],
  '병': ['인', '묘', '진', '사', '오', '미', '신', '유', '술', '해', '자', '축'],
  '정': ['유', '신', '미', '오', '사', '진', '묘', '인', '축', '자', '해', '술'],
  '무': ['인', '묘', '진', '사', '오', '미', '신', '유', '술', '해', '자', '축'],
  '기': ['유', '신', '미', '오', '사', '진', '묘', '인', '축', '자', '해', '술'],
  '경': ['사', '오', '미', '신', '유', '술', '해', '자', '축', '인', '묘', '진'],
  '신': ['자', '해', '술', '유', '신', '미', '오', '사', '진', '묘', '인', '축'],
  '임': ['신', '유', '술', '해', '자', '축', '인', '묘', '진', '사', '오', '미'],
  '계': ['묘', '인', '축', '자', '해', '술', '유', '신', '미', '오', '사', '진'],
};

export const UNSEONG_NAMES = [
  '장생', '목욕', '관대', '건록', '제왕', '쇠',
  '병', '사', '묘', '절', '태', '양',
] as const;

export const UNSEONG_MEANING: Record<string, string> = {
  '장생': '탄생, 시작',
  '목욕': '성장, 변화',
  '관대': '성인, 발전',
  '건록': '독립, 전성',
  '제왕': '정점, 권력',
  '쇠': '쇠퇴 시작',
  '병': '약해짐',
  '사': '끝, 변화',
  '묘': '저장, 잠복',
  '절': '단절, 재생 준비',
  '태': '잉태, 준비',
  '양': '양육, 성장',
};

// 신살 (神煞)
export interface Sinsal {
  name: string;
  hanja: string;
  meaning: string;
}

// 역마 - 지지 기준 (년/일 지지 기준)
export function getYeokma(branch: string): boolean {
  const yeokmaMap: Record<string, string[]> = {
    '인': ['신'],
    '신': ['인'],
    '사': ['해'],
    '해': ['사'],
    '자': ['묘'],
    '묘': ['자'],
    '축': ['진'],
    '진': ['축'],
    '오': ['유'],
    '유': ['오'],
    '미': ['술'],
    '술': ['미'],
  };
  return Object.keys(yeokmaMap).includes(branch);
}

// 도화 - 지지 기준
export function getDohwa(branch: string): boolean {
  const dohwaBranches = ['자', '묘', '오', '유'];
  return dohwaBranches.includes(branch);
}

// 천을귀인 - 일간 기준 지지
export function getCheoneul(dayStem: string): string[] {
  const map: Record<string, string[]> = {
    '갑': ['축', '미'],
    '을': ['자', '신'],
    '병': ['해', '유'],
    '정': ['유', '해'],
    '무': ['축', '미'],
    '기': ['자', '신'],
    '경': ['묘', '유'],
    '신': ['인', '오'],
    '임': ['사', '묘'],
    '계': ['묘', '사'],
  };
  return map[dayStem] || [];
}

// 화개 - 지지 기준
export function getHwagae(branch: string): boolean {
  const hwagaeBranches = ['사', '유', '축'];
  return hwagaeBranches.includes(branch);
}

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
