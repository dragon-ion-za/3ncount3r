FROM ghcr.io/dragon-ion-za/3ncount3r-api:adamantinearmor-10thlevel

WORKDIR /api

COPY config/api/** ./config/

CMD ["node", "api.bundle.js"]