PROJECT_PATH="/var/docker/dms/backend"
PROJECT_NAME="dms_backend"

cd $PROJECT_PATH
docker rm -f $PROJECT_NAME
docker build -t $PROJECT_NAME .
docker run -d \
-v $PROJECT_PATH/storage:/app/storage \
-v $PROJECT_PATH/tmp:/app/tmp \
--name $PROJECT_NAME $PROJECT_NAME
docker image prune -f
