# Etapa 1: Builder (Construcción y dependencias)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

# Etapa 2: Runner (Imagen final limpia)
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --chown=node:node . .

USER node

EXPOSE 3000 
CMD ["node", "src/index.js"]
