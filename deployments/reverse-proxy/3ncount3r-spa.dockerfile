FROM ghcr.io/dragon-ion-za/3ncount3r-spa:bane-3rdlevel

WORKDIR /usr/share/nginx/html
COPY ./ ./3ncount3r


CMD ["nginx", "-g", "daemon off;"]