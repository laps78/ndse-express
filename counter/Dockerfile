FROM node:alpine

WORKDIR /app-counter

COPY package*.json ./ \
    . ./
RUN npm install
VOLUME [ "." ]

CMD ["npm", "start"]