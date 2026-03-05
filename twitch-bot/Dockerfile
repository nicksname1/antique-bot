FROM node:24

WORKDIR /app

COPY twitch-bot/package.json ./
RUN npm install

COPY twitch-bot/ ./

CMD ["npm", "start"]
