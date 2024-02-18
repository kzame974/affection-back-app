 docker exec -it affection-back-app-backend-1 bash

 lancer les fixtures:
  npm run seed  
 

accéder à la bdd dans docker:
docker exec -it affection-back-app-postgres-1 bash psql -U merca -d mercateam974_db -W -h localhost -p 5432 