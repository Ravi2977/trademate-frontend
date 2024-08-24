# Use a Node.js base image
FROM node:16-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# If your application needs to be built (e.g., React app)
RUN npm build

# Expose the port your app runs on (usually 3000 for React/Node apps)
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
