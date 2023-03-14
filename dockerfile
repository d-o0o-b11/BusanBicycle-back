FROM node:18.12.1

WORKDIR /usr/src/bicyclebusan2

COPY package*.json yarn.lock nest-cli.json ./

RUN yarn

COPY . .

RUN yarn build

# CMD [ "node", "dist/main" ]

