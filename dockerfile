# Stage 1: Build Angular
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: NGINX unprivileged (vereinfacht)
FROM nginxinc/nginx-unprivileged:alpine3.22
USER root
# Erstelle /run/nginx als nginx (101) für PID
RUN mkdir -p /run/nginx && \
    chown -R 101:101 /run/nginx && \
    chmod 755 /run/nginx
USER nginx

# Kopiere angepasste Config mit /run/nginx.pid (funktioniert jetzt)
COPY nginx.conf /etc/nginx/nginx.conf
COPY --chown=101:101 --from=builder /app/dist/MeinPortfolio/browser /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
