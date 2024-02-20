FROM node:latest

WORKDIR /app

# Copier les fichiers de package pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Générer le client Prisma
RUN npx prisma generate --schema ./prisma/schema.prisma

# Exécuter les scripts de préparation de la base de données
RUN node ./fixture/skillsAndTaskFixture.cjs
RUN node ./fixture/seed.cjs

RUN npx tsc

EXPOSE 4000
CMD [ "node", "dist/index.js" ]
