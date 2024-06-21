# Use the official Node.js image with Node 18
FROM node:18-alpine

# Set environment variables
ENV NODE_ENV development

# Set working directory inside the container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of the application code to container
COPY . .

# Expose the port Next.js app runs on
EXPOSE 3000

# Start the Next.js application with hot reload
CMD ["npm", "run", "dev"]
