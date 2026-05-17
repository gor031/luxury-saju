# AI 연동 가이드 (Gemini / Google AI)

## 1. Google AI SDK 설치
```bash
npm install @google/generative-ai
```

## 2. API Key 설정
```bash
# .env 파일
VITE_GEMINI_API_KEY=your_api_key_here
```

## 3. Gemini 연동 코드 예시
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// 사주 해석 AI 생성
export async function generateSajuAnalysis(sajuData: SajuResult): Promise<string> {
  const prompt = `
    당신은 30년 경력의 전통 사주 명리학 전문가입니다.
    다음 사주 정보를 바탕으로 상세한 해석을 제공해주세요.

    생년월일: ${sajuData.birthDate.toLocaleDateString()}
    성별: ${sajuData.gender === 'male' ? '남성' : '여성'}
    일간: ${sajuData.dayMaster} (${sajuData.dayMasterOhang})

    사주 팔자:
    - 년주: ${sajuData.yearPillar.stem}${sajuData.yearPillar.branch}
    - 월주: ${sajuData.monthPillar.stem}${sajuData.monthPillar.branch}
    - 일주: ${sajuData.dayPillar.stem}${sajuData.dayPillar.branch}
    - 시주: ${sajuData.hourPillar.stem}${sajuData.hourPillar.branch}

    다음 내용을 포함해주세요:
    1. 성격 분석
    2. 직업/재물 운
    3. 연애/결혼 운
    4. 건강 운
    5. 조언

    존댓말로, 동양 철학의 깊이가 느껴지는 문체로 작성해주세요.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
```

## 4. 컴포넌트에서 사용
```tsx
// SajuResult.tsx에 추가
const [aiAnalysis, setAiAnalysis] = useState<string>('');
const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  generateSajuAnalysis(result)
    .then(setAiAnalysis)
    .finally(() => setLoading(false));
}, [result]);
```

## 5. gemma4 모델 (로컬/엣지 AI)
- **@gemma4**는 Google의 경량 오픈소스 LLM
- **Ollama** 또는 **llama.cpp**로 로컬 실행 가능
- 개인정보 보호에 유리 (서버 없이 브라우저/로컬에서 실행)

### Ollama 설치 후 실행
```bash
ollama pull gemma4
ollama run gemma4
```

### 웹앱에서 Ollama API 호출
```typescript
const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  body: JSON.stringify({
    model: 'gemma4',
    prompt: sajuPrompt,
    stream: false,
  }),
});
```
