# Etapa 1: Builder (Construcción y dependencias)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Instalamos solo lo estrictamente necesario para producción
RUN npm ci --only=production

# Etapa 2: Runner (Imagen final limpia)
FROM node:20-alpine
WORKDIR /app
# Traemos solo los módulos de producción desde la etapa 1
COPY --from=builder /app/node_modules ./node_modules
# Copiamos el código y asignamos el dueño en un solo paso (ahorra espacio)
COPY --chown=node:node . .

# Usar usuario no root por seguridad
USER node

# OJO: Validar si su app usa el 3000 o el 3001
EXPOSE 3000 
CMD ["node", "src/index.js"]