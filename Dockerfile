FROM node:23-alpine

WORKDIR /app

ARG NEXT_PUBLIC_API_SERVER_URL

ENV NEXT_PUBLIC_API_SERVER_URL=$NEXT_PUBLIC_API_SERVER_URL

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]