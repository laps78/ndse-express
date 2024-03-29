FROM node:alpine

WORKDIR /library-app

ARG NODE_ENV=development

COPY  ./package*.json ./
RUN npm install
COPY . ./

ENV PORT=4747

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]