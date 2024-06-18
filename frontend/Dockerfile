# Use an official Node.js LTS (Long Term Support) image
FROM node:lts

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Specify the command to run on container startup
CMD ["npm", "start"]
