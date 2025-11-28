# Redis Session Monorepo

Redis를 사용한 세션 관리 시스템의 모노레포입니다. Turborepo로 빌드 성능을 최적화했습니다. ⚡

## 프로젝트 구조

```
redis-session/
├── packages/
│   ├── redis-session-be/  # NestJS 백엔드
│   └── redis-session-fe/  # Next.js 프론트엔드
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## 시작하기

### 사전 요구사항

- Node.js 20+
- pnpm 10+

### 기술 스택

- 🔥 **Turborepo** - 고성능 빌드 시스템
- 📦 **pnpm** - 빠른 패키지 매니저
- 🚀 **NestJS** - 백엔드 프레임워크
- ⚡ **Next.js** - 프론트엔드 프레임워크
- 🔴 **Redis** - 세션 저장소

### 설치

```bash
# 모든 패키지 의존성 설치
pnpm install

# 환경 변수 설정 (선택사항)
cp packages/redis-session-be/.env.example packages/redis-session-be/.env
cp packages/redis-session-fe/.env.example packages/redis-session-fe/.env
```

### 포트 설정

- **프론트엔드**: http://localhost:3000
- **백엔드**: http://localhost:3001

포트를 변경하려면 `.env` 파일을 수정하세요.

### 개발 모드

```bash
# 모든 패키지를 동시에 개발 모드로 실행
pnpm dev

# 프론트엔드만 실행
pnpm dev:fe

# 백엔드만 실행
pnpm dev:be
```

### 빌드

```bash
# 모든 패키지 빌드
pnpm build

# 프론트엔드만 빌드
pnpm build:fe

# 백엔드만 빌드
pnpm build:be
```

### 프로덕션 실행

```bash
# 프론트엔드 프로덕션 모드 실행
pnpm start:fe

# 백엔드 프로덕션 모드 실행
pnpm start:be
```

### 린트 및 테스트

```bash
# 모든 패키지 린트 실행
pnpm lint

# 모든 패키지 테스트 실행
pnpm test

# E2E 테스트 실행
pnpm test:e2e

# 코드 포맷팅
pnpm format
```

### 클린업

```bash
# 빌드 결과물 및 node_modules 정리
pnpm clean
```

## 패키지

### redis-session-be

NestJS 기반의 백엔드 API 서버입니다.

- **위치**: `packages/redis-session-be`
- **포트**: 3001 (기본값)
- **URL**: http://localhost:3001
- **기술 스택**: NestJS, TypeScript, Redis

### redis-session-fe

Next.js 기반의 프론트엔드 애플리케이션입니다.

- **위치**: `packages/redis-session-fe`
- **포트**: 3000 (Next.js 기본 포트)
- **URL**: http://localhost:3000
- **기술 스택**: Next.js, React, TypeScript, Tailwind CSS, Redis

## Turborepo 명령어

Turborepo는 증분 빌드와 원격 캐싱으로 빌드 속도를 크게 향상시킵니다:

```bash
# 특정 패키지에서 명령어 실행
turbo run dev --filter=redis-session-fe
turbo run build --filter=redis-session-be

# 모든 패키지에서 명령어 실행 (병렬)
turbo run build
turbo run lint

# 캐시 무시하고 실행
turbo run build --force

# 빌드 의존성 그래프 확인
turbo run build --dry-run

# Turborepo UI로 실행 (상세 로그)
turbo run dev --ui=tui
```

### Turborepo의 장점

- ✅ **증분 빌드**: 변경된 패키지만 빌드
- ✅ **스마트 캐싱**: 이전 빌드 결과 재사용
- ✅ **병렬 실행**: 의존성 그래프 기반 최적화
- ✅ **원격 캐싱**: 팀 전체가 빌드 결과 공유 (선택사항)

## 작업 공간 명령어

pnpm workspaces와 Turborepo를 함께 사용할 수 있습니다:

```bash
# pnpm으로 특정 패키지에서 명령어 실행
pnpm --filter redis-session-fe <command>
pnpm --filter redis-session-be <command>

# Turborepo로 최적화된 실행 (권장)
turbo run <command> --filter=redis-session-fe
```

## 라이선스

UNLICENSED

