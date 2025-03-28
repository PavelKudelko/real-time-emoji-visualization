# frontend/Dockerfile

#Some implementation ideas provided below, but feel free to use your own.

#FROM nginx:alpine

#COPY . /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf
# Use official Node image as base
FROM node:18-alpine
# FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

COPY package*.json ./
RUN npm install


COPY . .

# Build the app
RUN npm run build


# ---- Serve with Nginx ----
FROM nginx:alpine

# Copy the built Vue files to Nginx’s serving directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80
#Now, Vue will be served as a static site by Nginx on port 80.

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]



