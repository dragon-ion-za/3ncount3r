FROM spa-3ncount3r-calllightning-cantrip-5

COPY config/nginx-cors/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]