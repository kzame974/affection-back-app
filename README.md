 docker exec -it affection-back-app-backend-1 bash

 lancer les fixtures:
 node src/fixture/skillsAndTaskFixture.cjs

 
ouvrir terminal docker back:
docker exec -it affection-back-app-backend-1 bash

migration:
npx prisma migrate dev
lancer le script de fixture:
node src/fixture/seed.cjs

accéder à la bdd dans docker:
docker exec -it affection-back-app-postgres-1 bash psql -U merca -d mercateam974_db -W -h localhost -p 5432 

\c mercateam_db
DROP DATABASE mercateam974_db;
