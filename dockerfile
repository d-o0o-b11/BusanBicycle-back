# FROM node:18.12.1

# WORKDIR /usr/src/bicyclebusan2

# COPY package*.json yarn.lock nest-cli.json ./

# RUN yarn

# COPY . .

# RUN yarn build

# EXPOSE 3001

# CMD [ "node", "dist/main" ]


# Dpendencies 설치 환경 (deps)
FROM node:18.12.1-alpine AS deps

WORKDIR /usr/src/bicyclebusan2/app

COPY package*.json yarn.lock nest-cli.json ./

RUN yarn

COPY . .

RUN yarn build

# Build(dist) 파일 생성 (builder)
# FROM node:18.12.1-alpine AS builder

# WORKDIR /usr/src/bicyclebusan2

# COPY ["tsconfig.build.json", "tsconfig.json", "./"]

# COPY ["src/", "./src/"]

# COPY --from=deps /app/node_modules ./node_modules

# RUN ["npx", "nest", "build"]

# 서버 실행 (runner) - node_modules, dist 파일만 복사 >> 빌드 과정 후 필요한 파일만 복사하여 컨테이너 실행
FROM node:16.16.0 AS runner

WORKDIR /usr/src/bicyclebusan2/app

COPY --from=deps /usr/src/bicyclebusan2/app/dist ./dist

COPY --from=deps /usr/src/bicyclebusan2/app/node_modules ./node_modules

CMD [ "yarn" , "start:test"]

# CMD ["node", "dist/main"]


# EXPOSE 3001
