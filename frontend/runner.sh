PROJECT_PATH="/var/docker/dms/frontend"
PROJECT_NAME="dms_frontend"

cd $BOT_PATH
docker rm -f $PROJECT_NAME
docker build -t $PROJECT_NAME .
docker run -d \
--name $PROJECT_NAME $PROJECT_NAME
docker image prune -f
