FROM node:current-alpine3.16

WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3003

CMD npm run dev