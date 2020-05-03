# fts-server

### Instructions 
- Make sure you have docker and docker compose installed 
- Create a new file `touch .env` or just create the file `.env` at the root of the app 
- copy over `.env.example into the .env file`
- If you will like to change some ports , please do this at the .env file without overriding the example file unless you are a contributor 
- Run `docker-compose up --build` this mahy take a while if this is the first time running , subsequent times will be a lot faster 
- When build succeds the server is available @ `http//${host}:{port}` default is `http://localhost:7777` please if you change the port replace the variables to represent the change 
- Run seeders as described below 
   - npm run seed:create-tables
   - npm run seed

## Common mistakes 
- Docker-compose fails 
  - Please copy the .env.example file into the .env file that will be created by you