docker pull postgres


docker volume create newVol

docker run --name pg -e POSTGRES_PASSWORD=lol -v /pgdata:/var/lib/postgresql/data --restart unless-stopped -p 5432:5432 -d postgres

docker exec -u postgres -it pg psql

#building local image
docker build -t ejareii/server .

#Pushing docker image
docker push ejareii/server
