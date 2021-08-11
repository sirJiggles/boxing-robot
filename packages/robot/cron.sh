echo "hello"
sleep 10
cd /home/pi/Desktop/development/boxing-robot/
sudo git pull
cd ./packages/robot
sudo yarn build
cp .env ./dist
sudo /home/pi/.config/versions/node/v16.6.1/bin/forever start ./dist/index.js