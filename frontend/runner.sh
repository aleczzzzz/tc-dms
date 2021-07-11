PROJECT_PATH="/var/docker/csd/frontend"
PROJECT_NAME="csd_frontend"

cd $PROJECT_PATH
docker rm -f $PROJECT_NAME
docker build -t $PROJECT_NAME .
docker run -d \
-p 0.0.0.0:81:80 \
--name $PROJECT_NAME $PROJECT_NAME
docker image prune -f
