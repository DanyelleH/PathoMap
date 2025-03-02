docker compose up --build
sleep 5

docker exec protein_proj-api-1 python /src/manage.py makemigrations 
docker exec protein_proj-api-1 python /src/manage.py migrate 