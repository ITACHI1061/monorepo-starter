# ------------------------------------------------------------------------------
# Step 0: 기본 이미지 설정 및 환경 변수 설정
# ------------------------------------------------------------------------------
FROM node:22-alpine AS base

# 전역 환경변수
ENV WORKDIR=/app
ENV APP_NAME=next-ready-stack
ENV PORT=3000

# pnpm 환경 변수 설정(없으면 pnpm 설치 시 오류 발생)
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV PNPM_VERSION=10.10.0

# ------------------------------------------------------------------------------
# Step 1: 소스 코드 준비 및 정리
# ------------------------------------------------------------------------------
FROM base AS builder

# node.js 실행을 위한 apk 라이브러리 설치
RUN apk add --no-cache libc6-compat

# 작업 디렉토리: /app
WORKDIR $WORKDIR

# pnpm, turbo 전역 설치
RUN corepack enable && corepack prepare pnpm@$PNPM_VERSION --activate
RUN pnpm add -g turbo

# 소스 코드 복사(.dockerignore 에 있는 파일은 제외)
# 로컬 루트부터 전체 코드를 컨테이너 /app 디렉토리로 복사
COPY . .

# turbo prune 실행
RUN turbo prune $APP_NAME --docker

# ------------------------------------------------------------------------------
# Step 2: 의존성 설치 및 프로젝트 빌드
# 이 단계에서 실행 가능한 .next/ 폴더가 생성
# ------------------------------------------------------------------------------
FROM base AS installer

# node.js 실행을 위한 apk 라이브러리 설치
RUN apk add --no-cache libc6-compat

# 작업 디렉토리: /app
WORKDIR $WORKDIR

# pnpm, turbo 전역 설치
RUN corepack enable && corepack prepare pnpm@$PNPM_VERSION --activate
RUN pnpm add -g turbo

# 의존성 설치를 위한 build 단계로부터 파일 복사
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

# pnpm install
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# better-sqlite3 Alpine 환경에 맞게 다시 빌드
RUN pnpm rebuild better-sqlite3

# 빌드에 필요한 모든 소스 파일 복사
COPY --from=builder /app/out/full/ .

# 로컬 루트의 turbo.json 을 작업디렉토리에 복사
COPY turbo.json turbo.json

# SQLite 기능 사용시, sqlite3 데이터베이스 디렉토리 생성
RUN mkdir -p ./apps/$APP_NAME/database

# 프로젝트와 그 의존성 프로젝트들을 빌드
RUN pnpm turbo build --filter=$APP_NAME...

# ------------------------------------------------------------------------------
# Step 3: 프로덕션 실행 환경 설정
# ------------------------------------------------------------------------------
FROM base AS runner
WORKDIR $WORKDIR

# 보안 강화: 루트 권한이 아닌 별도의 시스템 사용자로 실행
# 1001:1001의 UID:GID로 nextjs 사용자와 그룹 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# user 변경
USER nextjs

# 최종 빌드된 파일에서 필수 파일만 추출
COPY --from=installer --chown=nextjs:nodejs /app/apps/$APP_NAME/next.config.ts .
COPY --from=installer --chown=nextjs:nodejs /app/apps/$APP_NAME/package.json .
COPY --from=installer --chown=nextjs:nodejs /app/apps/$APP_NAME/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/$APP_NAME/.next/static ./apps/$APP_NAME/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/$APP_NAME/public ./apps/$APP_NAME/public
# Log 기능 사용시,
COPY --from=installer --chown=nextjs:nodejs /app/apps/$APP_NAME/logs ./apps/$APP_NAME/logs
# SQLite 기능 사용시,
COPY --from=installer --chown=nextjs:nodejs /app/apps/$APP_NAME/database ./apps/$APP_NAME/database

# Next.js 애플리케이션 서버 실행
# standalone 모드로 생성된 server.js를 실행
CMD node apps/$APP_NAME/server.js
