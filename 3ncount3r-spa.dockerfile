FROM ghcr.io/dragon-ion-za/3ncount3r-spa:bane-2ndlevel

WORKDIR /usr/share/nginx/html

COPY hostingConfigs/shell/** ./assets/

CMD ["nginx", "-g", "daemon off;"]