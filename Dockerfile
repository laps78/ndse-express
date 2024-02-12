FROM node:20.11

WORKDIR /library-app

ARG NODE_ENV=development

COPY ./package*.json ./
RUN npm install
COPY ./src src/
COPY ./routes routes/
COPY ./views views/
COPY ./public public/
COPY ./data-storage data-storage/
COPY ./index.js ./

ENV PORT=4747

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]