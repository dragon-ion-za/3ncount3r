FROM ghcr.io/dragon-ion-za/3ncount3r-spa:bane-2ndlevel

COPY config/nginx-cors/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]