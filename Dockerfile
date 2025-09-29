FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2
FROM node:20-alpine AS runner

# Instalar Docker CLI
RUN apk add --no-cache docker-cli bash
RUN apk add --no-cache git


WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY package*.json ./

RUN npm ci --only=production \
  && npm cache clean --force \
  && rm -rf /tmp/*

CMD ["node", "dist/index.js"]