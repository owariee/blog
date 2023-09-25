#!/usr/bin/env bash

sudo systemctl start docker.service
mkdir logs
sudo docker-compose up | tee -a logs/docker-compose.log &
cd back-source
node index.js | tee -a logs/backend.log
sudo killall docker-compose
sudo killall node
