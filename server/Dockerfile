# Use the official Node.js image (lightweight version)
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json first to cache dependencies (faster builds)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose the port your backend runs on (usually 5000)
EXPOSE 5000

# Command to run the app (using nodemon for live updates)
CMD ["npm", "run", "dev"]