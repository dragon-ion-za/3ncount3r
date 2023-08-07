FROM ghcr.io/dragon-ion-za/3ncount3r-api:bagofbeans-3rdlevel

WORKDIR /api

COPY config/3ncount3r/** ./config/

CMD ["node", "api.bundle.js"]