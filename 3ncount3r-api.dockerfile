FROM ghcr.io/dragon-ion-za/3ncount3r-api:bagofbeans-1stlevel

WORKDIR /api

COPY hostingConfigs/3ncount3r/** ./config/

CMD ["node", "api.bundle.js"]