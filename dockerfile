
# Dpendencies 설치 환경 (deps)
FROM node:18.12.1-alpine AS deps

WORKDIR /usr/src/bicyclebusan2/app

COPY package*.json yarn.lock nest-cli.json tsconfig.json ./

COPY . .

RUN npm install -g @nestjs/cli
RUN yarn
RUN yarn build

# COPY . .



# 서버 실행 (runner) - node_modules, dist 파일만 복사 >> 빌드 과정 후 필요한 파일만 복사하여 컨테이너 실행
FROM node:16.16.0 AS runner


WORKDIR /usr/src/bicyclebusan2/app

COPY --from=deps /usr/src/bicyclebusan2/app/dist ./dist
COPY --from=deps /usr/src/bicyclebusan2/app/src/envs ./src/envs
COPY --from=deps /usr/src/bicyclebusan2/app/node_modules ./node_modules

CMD ["node", "dist/main"]

