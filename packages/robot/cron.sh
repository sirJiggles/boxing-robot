echo "hello"
sleep 10
cd /home/pi/Desktop/development/boxing-robot && git pull && cd pacakges/robot && sudo yarn start
# sudo /usr/local/bin/forever start /home/pi/Desktop/development/boxing-robot/packages/boxing-robot/dist/index.js