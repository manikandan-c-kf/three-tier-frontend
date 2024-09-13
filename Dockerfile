# Stage 1: Build the Angular App
FROM node:20.17.0-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for npm install (this step is cached if package.json has not changed)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Stage 2: Serve the Angular App using Nginx
FROM nginx:alpine

# Copy the built Angular app from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for serving the Angular app
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
