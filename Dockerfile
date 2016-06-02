FROM node:6.20
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY .bowerrc /usr/src/app/
RUN npm install
RUN bower install angular
RUN bower install angular.js

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]