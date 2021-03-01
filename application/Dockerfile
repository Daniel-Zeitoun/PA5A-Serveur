FROM node:14.16.0-alpine3.10

RUN mkdir /application
WORKDIR /application

COPY ./application /application

RUN npm install

EXPOSE 80
CMD ["npm", "run", "start"]