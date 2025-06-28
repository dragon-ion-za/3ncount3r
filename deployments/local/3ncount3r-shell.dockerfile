FROM spa-shell-calllightning-cantrip-1

COPY config/shell/nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY config/shell/assets/** ./assets/

CMD ["nginx", "-g", "daemon off;"]