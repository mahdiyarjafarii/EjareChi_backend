docker pull postgres


docker volume create newVol

docker run --name pg -e POSTGRES_PASSWORD=lol -v /pgdata:/var/lib/postgresql/data --restart unless-stopped -p 5432:5432 -d postgres

docker exec -u postgres -it pg psql

#building local image
docker build -t ejareii/server .

#Pushing docker image
docker push ejareii/server



##########################
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install my-ingress-nginx ingress-nginx/ingress-nginx

helm repo add traefik https://helm.traefik.io/traefik
helm install my-traefik traefik/traef
#########################