FROM ghcr.io/dragon-ion-za/3ncount3r-api:adamantinearmor-10thlevel

WORKDIR /api

COPY hostingConfigs/api/** ./config/

CMD ["node", "api.bundle.js"]