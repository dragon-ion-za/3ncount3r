FROM ghcr.io/dragon-ion-za/cl3anslat3-api:bagofbeans-4thlevel

WORKDIR /api

COPY config/cl3anslat3/** ./config/

CMD ["node", "api.bundle.js"]