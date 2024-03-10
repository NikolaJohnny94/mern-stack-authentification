FROM node:20.11.1-alpine

RUN npm install -g nodemon

WORKDIR /backend_application 

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["nodemon", "build/index.js"]