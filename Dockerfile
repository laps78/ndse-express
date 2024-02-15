FROM node:20.11

WORKDIR /library-app

ARG NODE_ENV=development

COPY  ./package*.json \
      ./src           \
      ./routes        \
      ./views         \
      ./public        \
      ./data-storage  \
      ./index.js      \
      ./
RUN npm install


ENV PORT=4747

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]