# Vercel 배포 가이드 (with Gemini API)

## 1. Vercel CLI로 배포

```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인 (브라우저에서 인증)
vercel login

# 프로젝트 연결 및 배포
vercel --prod
```

## 2. GitHub 연동 자동 배포

1. https://vercel.com/new 에 접속
2. `gor031/luxury-saju` 저장소 선택
3. **Framework Preset**: `Vite` 선택
4. **Environment Variables** 섹션에서 아래 변수 추가:
   - `VITE_GEMINI_API_KEY` = `AIzaSyBblXR5ZLrqhrjFBzJ4mf9JuddVF8ppzMA`
5. **Deploy** 클릭

## 3. 환경 변수 설정 (배포 후)

### Vercel Dashboard
1. https://vercel.com/dashboard 에서 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 아래 변수 추가:

| 변수명 | 값 | 설명 |
|--------|-----|------|
| `VITE_GEMINI_API_KEY` | `AIzaSyBblXR5ZLrqhrjFBzJ4mf9JuddVF8ppzMA` | Gemini API 키 |

4. **Save** 후 **Redeploy**

### Vercel CLI
```bash
vercel env add VITE_GEMINI_API_KEY
# 값 입력 후 배포
vercel --prod
```

## ⚠️ API 키 보안 주의사항

1. **API 키는 절대 코드에 직접 작성하지 마세요**
2. `.env` 파일은 `.gitignore`에 포함되어야 함
3. 클라이언트 사이드(`VITE_` 접두사) 키는 브라우저에서 노출됨
4. **프로덕션 환경에서는 서버 사이드 API 호출을 권장** (Edge Function 등)
5. API 키 사용량 모니터링: https://aistudio.google.com/app/apikey

## 참고
- Gemini API 문서: https://ai.google.dev/gemini-api/docs
- 모델: `gemma-4-31b-it`
