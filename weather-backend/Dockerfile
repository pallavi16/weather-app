# Use a lightweight Node.js image
FROM node:16-alpine
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose port 5001 and start the server
EXPOSE 5001
CMD ["node", "index.js"]
