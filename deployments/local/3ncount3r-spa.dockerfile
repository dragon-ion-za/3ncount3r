FROM ghcr.io/dragon-ion-za/3ncount3r-spa:bane-4thlevel

COPY config/nginx-cors/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]