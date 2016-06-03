FROM node:latest
# Create app directory
RUN mkdir /node-test
WORKDIR /node-test

# Install app dependencies
COPY package.json /node-test
RUN npm install
RUN npm install --global bower
RUN bower --allow-root install angular.js

# Bundle app source
ADD . /node-test

EXPOSE 3000
CMD [ "npm", "start" ]