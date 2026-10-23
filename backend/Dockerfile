
FROM node:22-bookworm-slim

WORKDIR /app

# Install tools required to compile native Node.js modules
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm ci

COPY . .

RUN mkdir -p /app/data

EXPOSE 5000

CMD ["npm", "start"]

