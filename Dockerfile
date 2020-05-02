FROM node:10
WORKDIR /usr/src
COPY package*.json ./
RUN npm install
EXPOSE 8080
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait