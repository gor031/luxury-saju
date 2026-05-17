import { GoogleGenerativeAI } from '@google/generative-ai';
import type { SajuResult } from './sajuCalculator';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

function getModel() {
  if (!API_KEY) {
    throw new Error('VITE_GEMINI_API_KEY가 설정되지 않았습니다. .env 파일을 확인하세요.');
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemma-4-31b-it' });
  }
  return model;
}

function buildSajuPrompt(result: SajuResult): string {
  const genderText = result.gender === 'male' ? '남성' : '여성';
  const calendarText = result.isLunar
    ? `음력 ${result.lunarDate?.year}년 ${result.lunarDate?.month}월 ${result.lunarDate?.day}일 (양력 ${result.birthDate.getFullYear()}년 ${result.birthDate.getMonth() + 1}월 ${result.birthDate.getDate()}일)`
    : `양력 ${result.birthDate.getFullYear()}년 ${result.birthDate.getMonth() + 1}월 ${result.birthDate.getDate()}일`;

  return `당신은 30년 경력의 전통 사주 명리학 전문가입니다. 다음 사주 정보를 바탕으로 상세하고 통찰력 있는 해석을 제공해주세요.

【기본 정보】
- 성명: ${result.name || '미입력'}
- 성별: ${genderText}
- 생년월일: ${calendarText}
- 태어난 시: ${result.birthDate.getHours()}:00

【사주 팔자】
- 년주: ${result.yearPillar.stem}${result.yearPillar.branch} (${result.yearPillar.stemOhang}${result.yearPillar.branchOhang})
- 월주: ${result.monthPillar.stem}${result.monthPillar.branch} (${result.monthPillar.stemOhang}${result.monthPillar.branchOhang})
- 일주: ${result.dayPillar.stem}${result.dayPillar.branch} (${result.dayPillar.stemOhang}${result.dayPillar.branchOhang}) ← 일간(日主)
- 시주: ${result.hourPillar.stem}${result.hourPillar.branch} (${result.hourPillar.stemOhang}${result.hourPillar.branchOhang})

【오행 분석】
- 일간 오행: ${result.dayMasterOhang}
- 천간 오행: ${result.yearPillar.stemOhang}, ${result.monthPillar.stemOhang}, ${result.dayPillar.stemOhang}, ${result.hourPillar.stemOhang}
- 지지 오행: ${result.yearPillar.branchOhang}, ${result.monthPillar.branchOhang}, ${result.dayPillar.branchOhang}, ${result.hourPillar.branchOhang}

【요청 사항】
아래 항목을 전문가의 깊이 있는 관점에서 작성해주세요. 각 항목은 300~500자 내외로, 구체적이고 실용적인 조언을 포함해주세요.

1. 【성격과 기질】 일간(${result.dayMaster})의 특성과 사주 전체의 기운 흐름을 분석하여 성격과 기질을 설명해주세요.

2. 【직업과 재물】 적성에 맞는 직업군과 재물운의 흐름, 재테크 방향을 조언해주세요.

3. 【인연과 결혼】 배우자 자리와 인연운, 결혼 시기 및 배우자 특징을 알려주세요.

4. 【건강과 운수】 주의해야 할 건강 부위와 전반적인 건강운을 설명해주세요.

5. 【조언과 길방】 현재 상황에서 가장 필요한 조언과 유리한 방향(길방), 행운의 색깔/방위 등을 알려주세요.

존댓말로, 동양 철학의 깊이가 느껴지는 문체로 작성해주세요. 지나치게 일반적인 내용은 피하고, 위 사주의 구체적인 조합을 바탕으로 한 맞춤형 해석을 부탁드립니다.`;
}

export interface AiAnalysisResult {
  content: string;
  sections: {
    title: string;
    content: string;
  }[];
}

function parseSections(text: string): AiAnalysisResult['sections'] {
  const sections: AiAnalysisResult['sections'] = [];
  const lines = text.split('\n');
  let currentTitle = '';
  let currentContent = '';

  for (const line of lines) {
    const match = line.match(/^\d+\.\s*【(.+)】/);
    if (match) {
      if (currentTitle) {
        sections.push({ title: currentTitle, content: currentContent.trim() });
      }
      currentTitle = match[1];
      currentContent = '';
    } else if (currentTitle) {
      currentContent += line + '\n';
    }
  }

  if (currentTitle) {
    sections.push({ title: currentTitle, content: currentContent.trim() });
  }

  return sections;
}

export async function generateSajuAnalysis(result: SajuResult): Promise<AiAnalysisResult> {
  const modelInstance = getModel();
  const prompt = buildSajuPrompt(result);

  const response = await modelInstance.generateContent(prompt);
  const text = response.response.text();

  return {
    content: text,
    sections: parseSections(text),
  };
}

export function isAiAvailable(): boolean {
  return !!API_KEY;
}
