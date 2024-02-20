FROM node:latest

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY . .

# Install project dependencies

RUN npm install

RUN npx prisma generate --schema ./prisma/schema.prisma

RUN node ./fixture/skillsAndTaskFixture.cjs
RUN node ./fixture/seed.cjs

RUN npm run build

EXPOSE 4000
CMD ["node", "dist/index.js"]
