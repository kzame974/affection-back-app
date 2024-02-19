FROM node:lts

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY . .


RUN npm install

RUN npx prisma generate --schema ./prisma/schema.prisma

RUN npx tsc

EXPOSE 4000


CMD [ "npm", "run", "start:migrate:prod" ]