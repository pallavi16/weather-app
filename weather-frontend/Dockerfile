# Use Node.js for building the React app
FROM node:16-alpine as build
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the React app code and build the production files
COPY . .
RUN npm run build

# Use a lightweight Nginx image to serve the built files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the frontend
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
