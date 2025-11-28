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

## ✨ 구현된 기능

### 🔐 인증 시스템

- ✅ **로컬 인증**: 이메일/비밀번호 기반 로그인
- ✅ **세션 관리**: Redis를 사용한 서버 사이드 세션 저장
- ✅ **Passport.js**: NestJS와 통합된 인증 미들웨어
- ✅ **보안**: bcrypt를 사용한 비밀번호 해싱
- ✅ **CORS**: 프론트엔드와 백엔드 간 안전한 통신

### 🎯 API 엔드포인트

- `POST /auth/login` - 로그인
- `POST /auth/logout` - 로그아웃
- `GET /auth/me` - 현재 사용자 조회
- `GET /auth/status` - 인증 상태 확인

### 🎨 프론트엔드

- ✅ **로그인 페이지**: 모던한 UI/UX
- ✅ **대시보드**: 사용자 정보 표시
- ✅ **자동 리다이렉트**: 인증되지 않은 사용자는 로그인 페이지로 이동
- ✅ **세션 쿠키**: 자동으로 처리되는 HTTP-only 쿠키

## 시작하기

### 사전 요구사항

- Node.js 20+
- pnpm 10+
- **Redis** (Docker 또는 로컬 설치)

### Redis 실행 (Docker)

```bash
# Redis 컨테이너 실행
docker run -d --name redis-session -p 6379:6379 redis:latest

# Redis 상태 확인
docker ps | grep redis
```

### 기술 스택

- 🔥 **Turborepo** - 고성능 빌드 시스템
- 📦 **pnpm** - 빠른 패키지 매니저
- 🚀 **NestJS** - 백엔드 프레임워크
- ⚡ **Next.js** - 프론트엔드 프레임워크
- 🔴 **Redis** - 세션 저장소 (node-redis)
- 🔐 **Passport.js** - 인증 미들웨어
- 🔒 **bcrypt** - 비밀번호 해싱

### 설치

```bash
# 모든 패키지 의존성 설치
pnpm install

# 환경 변수 설정
cp packages/redis-session-be/.env.example packages/redis-session-be/.env
cp packages/redis-session-fe/.env.example packages/redis-session-fe/.env.local
```

### 환경 변수 설정

**백엔드 (packages/redis-session-be/.env)**:
```env
PORT=3001
NODE_ENV=development
REDIS_HOST=localhost
REDIS_PORT=6379
SESSION_SECRET=your-secret-key-change-in-production
FRONTEND_URL=http://localhost:3000
```

**프론트엔드 (packages/redis-session-fe/.env.local)**:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 포트 설정

- **프론트엔드**: http://localhost:3000
- **백엔드**: http://localhost:3001
- **Redis**: localhost:6379

포트를 변경하려면 `.env` 파일을 수정하세요.

### 개발 모드

```bash
# Redis가 실행 중인지 확인
docker ps | grep redis

# 모든 패키지를 동시에 개발 모드로 실행
pnpm dev

# 프론트엔드만 실행
pnpm dev:fe

# 백엔드만 실행
pnpm dev:be
```

### 🧪 테스트 계정

애플리케이션에는 테스트용 사용자 계정이 포함되어 있습니다:

- **이메일**: `test@example.com`
- **비밀번호**: `password123`

또는

- **이메일**: `admin@example.com`
- **비밀번호**: `password123`

### 사용 방법

1. **Redis 실행**: `docker run -d --name redis-session -p 6379:6379 redis:latest`
2. **의존성 설치**: `pnpm install`
3. **환경 변수 설정**: `.env` 파일 생성
4. **개발 서버 시작**: `pnpm dev`
5. **브라우저에서 접속**: http://localhost:3000
6. **로그인**: 테스트 계정으로 로그인
7. **세션 확인**: 대시보드에서 사용자 정보 확인

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
- **기술 스택**: NestJS, TypeScript, Redis (node-redis), Passport.js, express-session

#### 주요 모듈

- **AuthModule**: 인증 로직 (로그인, 로그아웃, 사용자 조회)
- **UserModule**: 사용자 관리 (메모리 기반 저장소)
- **SessionModule**: Redis 세션 관리

### redis-session-fe

Next.js 기반의 프론트엔드 애플리케이션입니다.

- **위치**: `packages/redis-session-fe`
- **포트**: 3000 (Next.js 기본 포트)
- **URL**: http://localhost:3000
- **기술 스택**: Next.js, React, TypeScript, Tailwind CSS

#### 주요 페이지

- `/login`: 로그인 페이지
- `/`: 대시보드 (인증 필요)

## 🔧 Redis 세션 작동 방식

1. **로그인**: 사용자가 이메일/비밀번호로 로그인
2. **세션 생성**: 백엔드가 Redis에 세션 데이터 저장
3. **쿠키 전송**: HTTP-only 세션 쿠키를 클라이언트에 전송
4. **인증 유지**: 모든 요청에 세션 쿠키가 자동으로 포함됨
5. **세션 검증**: 백엔드가 Redis에서 세션 확인
6. **로그아웃**: 세션 삭제 및 쿠키 제거

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

## 🐛 문제 해결

### Redis 연결 실패

```bash
# Redis가 실행 중인지 확인
docker ps | grep redis

# Redis 로그 확인
docker logs redis-session

# Redis 재시작
docker restart redis-session
```

### 포트 충돌

- 백엔드 포트를 변경하려면 `packages/redis-session-be/.env`의 `PORT` 수정
- 프론트엔드 포트를 변경하려면 `packages/redis-session-fe/package.json`의 `dev` 스크립트 수정

### 세션 쿠키가 저장되지 않음

- CORS 설정 확인 (credentials: true)
- 브라우저 쿠키 설정 확인
- HTTPS 환경에서는 `secure: true` 설정 필요

## 라이선스

UNLICENSED

