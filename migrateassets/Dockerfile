FROM node:16-bullseye

ARG ENV

WORKDIR /usr/src/migrate

COPY package*.json ./

#debug
RUN  npm install 

COPY . .

ENTRYPOINT [ "npm", "run" ]
