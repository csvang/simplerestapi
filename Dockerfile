FROM node:12

# Create app dir
WORKDIR /usr/src/simplerestapi

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]