FROM node:12.19.0-alpine

ENV TZ Asia/Manila

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["node","server.js"]