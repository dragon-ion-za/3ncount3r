FROM nginx:stable-alpine

COPY config/nginx-proxy/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]