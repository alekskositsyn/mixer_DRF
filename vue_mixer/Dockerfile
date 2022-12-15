FROM node:16.15.1

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
#RUN npm install

COPY . /app

# start app
CMD npm run serve