# This is where you define the image for
# the server A.

# You should use Node image from Docker Hub as the basis.

#FROM node:version...

#WORKDIR ?

#COPY ?

# RUN ?

#COPY . .

#CMD [??]

FROM node:18
# This says to use the latest Node.js image as the starting point.

WORKDIR /app
# This creates a folder inside the Docker container called "app". It's like your server's home.

COPY package*.json ./
# This copies your package.json and package-lock.json files into the "app" folder. These files tell Node.js what libraries your server needs.

RUN npm install
# This runs the command "npm install" inside the container. It's like downloading all the tools your server needs to work.

COPY . .
# This copies all the files from your server_a folder into the "app" folder. It's like putting all your server's code into its home.

EXPOSE 3000

CMD ["node", "index.js"]
# This tells Docker to run "node index.js" when the container starts. "index.js" is usually the main file of a Node.js server.