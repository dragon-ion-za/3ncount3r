FROM ghcr.io/dragon-ion-za/3ncount3r-shell:bane-3rdlevel

WORKDIR /usr/share/nginx/html

COPY config/shell/** ./assets/

CMD ["nginx", "-g", "daemon off;"]