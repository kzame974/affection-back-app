FROM node:lts

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

RUN npm install -g ts-node

RUN npx prisma generate --schema ./prisma/schema.prisma

RUN npm run build

EXPOSE 4000
CMD ["node", "dist/index.js"]
