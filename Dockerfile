# Use an official Node.js image.
FROM node:22

# Install Chromium.
RUN apt-get update && apt-get install -y chromium

# Set the working directory.
WORKDIR /app

# Copy package files and install dependencies.
COPY package*.json ./
RUN npm install

# Copy the rest of your application files.
COPY . .

# Optionally, set an environment variable for the Chrome executable path.
ENV CHROME_PATH=/usr/bin/chromium

# Start the application.
CMD ["npm", "start"]
