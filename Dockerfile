FROM hypriot/rpi-node:latest
USER node
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --unsafe-perm
RUN npm install react-scripts@3.0.1 -g --unsafe-perm

# start app
CMD ["npm", "start"]