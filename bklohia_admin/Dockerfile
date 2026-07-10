FROM node:20-alpine

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Copy all files
COPY . .

# Build the Next.js app
RUN npm run build

# Start the Next.js app
ENV PORT=3011
EXPOSE 3011
CMD ["npm", "run", "start"]
