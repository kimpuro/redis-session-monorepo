# Redis Session Monorepo

Redis를 사용한 세션 관리 시스템의 모노레포입니다.

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

### 설치

```bash
# 모든 패키지 의존성 설치
pnpm install
```

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
```

## 패키지

### redis-session-be

NestJS 기반의 백엔드 API 서버입니다.

- **위치**: `packages/redis-session-be`
- **포트**: 3000 (기본값)
- **기술 스택**: NestJS, TypeScript

### redis-session-fe

Next.js 기반의 프론트엔드 애플리케이션입니다.

- **위치**: `packages/redis-session-fe`
- **포트**: 3001 (또는 Next.js 기본 포트)
- **기술 스택**: Next.js, React, TypeScript, Tailwind CSS

## 작업 공간 명령어

pnpm workspaces를 사용하여 특정 패키지에서 명령어를 실행할 수 있습니다:

```bash
# 특정 패키지에서 명령어 실행
pnpm --filter redis-session-fe <command>
pnpm --filter redis-session-be <command>

# 모든 패키지에서 명령어 병렬 실행
pnpm --parallel --filter "./packages/*" <command>
```

## 라이선스

UNLICENSED

