# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript code if necessary (optional, depending on your start script)
# RUN npm run build

# Expose the port the app runs on
EXPOSE 3004

# Command to run the application using the start script from package.json
CMD ["npm", "start"]
