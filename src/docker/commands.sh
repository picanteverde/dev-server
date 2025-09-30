docker run \                                                                                                                  git:(main) ✗ 
  -it \
  --platform linux/amd64 \
  --mount type=bind,src=.,dst=/usr/app \
  node:20-alpine

  docker run --name mynodecontainer -d -i -t node:20-alpine /bin/sh      



  docker exec   mynodecontainer /bin/sh -c "ls"     

docker run \
  --name mynodecontainer \
  --mount type=bind,src=.,dst=/usr/app \
  -w /usr/app \
  -t node:20-alpine\
  /bin/sh -c "ls"