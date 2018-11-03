#!/bin/bash

SERVER_PORT=3000
MONGO_URI=http://localhost:27017
PM2_INSTANCES=1
PM2_AUTORESTART=true
PM2_MAX_MEMORY_RESTART=1G
DIRECTORY=$(pwd)

echo "Creating Development Environment Variables"

cat > "$DIRECTORY/.env" <<- EOM
SERVER_PORT=${SERVER_PORT}
MONGO_URI=${MONGO_URI}
PM2_INSTANCES=${PM2_INSTANCES}
PM2_AUTORESTART=${PM2_AUTORESTART}
PM2_MAX_MEMORY_RESTART=${PM2_MAX_MEMORY_RESTART}
EOM

echo "Development environment variables created successfully at '${DIRECTORY}'."
