# landingpage-cms/Dockerfile.dev - Untuk Development

FROM node:20-alpine

WORKDIR /app

# Install dependencies globally yang sering digunakan untuk development
RUN npm install -g nodemon

# Copy package files
COPY package*.json ./

# Install all dependencies (termasuk devDependencies)
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Command untuk development dengan hot reload
CMD ["npm", "run", "dev"]
