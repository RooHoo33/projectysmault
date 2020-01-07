FROM arm32v7/node:8.17.0-jessie

# Create a work directory and copy over our dependency manifest files.
RUN mkdir /app
WORKDIR /app
COPY /src /app/src
COPY ["package.json", "package-lock.json*", "./"]

# If you're using yarn:
#  yarn build
RUN npm install --production && mv node_modules ../

# Expose PORT 3000 on our virtual machine so we can run our server
EXPOSE 3000

#WORKDIR /app
#COPY . ./
#RUN yarn
#RUN yarn build
#
## Stage 2 - the production environment
#FROM tobi312/rpi-nginx:alpine
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=react-build /app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]