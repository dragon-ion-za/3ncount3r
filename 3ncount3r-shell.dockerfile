FROM ghcr.io/dragon-ion-za/3ncount3r-shell:bane-1stlevel

WORKDIR /usr/share/nginx/html

COPY hostingConfigs/shell/** ./assets/

CMD ["nginx", "-g", "daemon off;"]