FROM ghcr.io/dragon-ion-za/3ncount3r-shell:bane-5thlevel

COPY config/shell/nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY config/shell/assets/** ./assets/

CMD ["nginx", "-g", "daemon off;"]