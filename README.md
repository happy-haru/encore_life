# Encore Life (앙코르 라이프)

**경험이 빛나는 새로운 시작**

Encore Life는 40-60대 중장년층의 성공적인 재취업과 활발한 사회 참여를 지원하는 종합 플랫폼입니다.

## 🎯 프로젝트 소개

대한민국의 중장년층은 풍부한 경력과 전문성을 보유하고 있지만, 재취업 과정에서 많은 어려움을 겪고 있습니다. Encore Life는 이러한 문제를 해결하기 위해 **맞춤형 일자리 정보**, **재취업 교육**, **커뮤니티 네트워킹**을 하나의 플랫폼에서 제공합니다.

## ✨ 주요 기능

### 1. 맞춤형 일자리 정보
- 사용자의 경력과 희망 조건에 맞는 일자리 추천
- 중장년층 친화적인 기업 정보 제공
- 직무별, 지역별 필터링 지원

### 2. 재취업 교육
- 이력서 작성 가이드
- 면접 준비 및 팁
- 디지털 역량 강화 교육
- 산업별 최신 트렌드 정보

### 3. 커뮤니티 라운지
- **지역별 모임**: 같은 지역의 구직자들과 네트워킹
- **직종별 모임**: 동종 업계 종사자들과 정보 교류
- **재취업 성공 스토리**: 성공 사례 공유 및 동기 부여
- **면접 후기**: 실제 면접 경험 공유

### 4. 간편한 소셜 로그인
- 카카오 로그인
- 구글 로그인

## 🛠 기술 스택

- **Frontend**: Next.js 16 (App Router), React, TypeScript
- **Styling**: Tailwind CSS v4
- **Backend & Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (OAuth - Kakao, Google)
- **Deployment**: Vercel

## 🚀 시작하기

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 개발 서버 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 📁 프로젝트 구조

```
encore_life/
├── app/                    # Next.js App Router 페이지
│   ├── auth/              # 인증 관련 페이지
│   ├── community/         # 커뮤니티 페이지
│   ├── jobs/              # 일자리 정보 페이지
│   └── education/         # 교육 페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── auth/             # 인증 컴포넌트
│   ├── community/        # 커뮤니티 컴포넌트
│   └── layout/           # 레이아웃 컴포넌트
├── lib/                   # 유틸리티 및 헬퍼 함수
│   ├── actions/          # Server Actions
│   ├── supabase/         # Supabase 클라이언트
│   └── utils/            # 유틸리티 함수
└── public/               # 정적 파일

```

## 🎨 디자인 시스템

Encore Life는 중장년층 사용자를 고려한 디자인 원칙을 따릅니다:

- **명확성**: 큰 폰트와 높은 가독성
- **직관성**: 쉽고 간단한 네비게이션
- **접근성**: WCAG 접근성 가이드라인 준수
- **색상**: 
  - Primary (Navy): 신뢰와 전문성
  - Secondary (Orange): 따뜻함과 활력
  - Accent (Mint): 희망과 새로움

## 📱 지원 브라우저

- Chrome (최신 버전)
- Safari (최신 버전)
- Firefox (최신 버전)
- Edge (최신 버전)

## 📄 라이선스

이 프로젝트는 개인 프로젝트입니다.

## 👥 만든이

**Encore Life Team**

---

*"경험은 가장 귀중한 자산입니다. Encore Life와 함께 새로운 시작을 준비하세요."*
