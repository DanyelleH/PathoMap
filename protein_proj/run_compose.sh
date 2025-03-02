docker-compose up -d --build
sleep 5

docker exec protein_proj-api-1 python /src/manage.py makemigrations 
docker exec protein_proj-api-1 python /src/manage.py migrate 

docker run -p 8090:80 pathomap-react-server