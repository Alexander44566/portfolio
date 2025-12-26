# Stage 1: Build
ARG NODE_VERSION=24.7.0-alpine
FROM node:${NODE_VERSION} AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Webserver
FROM nginxinc/nginx-unprivileged:alpine3.22 AS runner
USER nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx --from=builder /app/dist/MeinPortfolio/browser /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
