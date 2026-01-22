FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine3.22
USER root
# Deaktiviere problematische scripts + sichere Temp-Pfade
RUN rm -rf /docker-entrypoint.d/* && \
    mkdir -p /tmp/client_temp /tmp/proxy_temp && \
    chown -R 101:101 /tmp /run/nginx && \
    chmod 755 /tmp /run/nginx
USER nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY --chown=101:101 --from=builder /app/dist/MeinPortfolio/browser /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
