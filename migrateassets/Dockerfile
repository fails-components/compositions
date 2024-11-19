FROM node:22-bookworm

ARG ENV

WORKDIR /usr/src/migrate

COPY package*.json ./

#debug
RUN  npm install 

COPY . .

ENTRYPOINT [ "npm", "run" ]
