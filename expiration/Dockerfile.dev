FROM node:alpine

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN  yarn install --production
COPY . .

CMD ["yarn","run","start"]