FROM ghcr.io/dragon-ion-za/5eapi:aid-1stlevel

WORKDIR /api

COPY hostingConfigs/5eapi/** ./config/

CMD ["node", "api.bundle.js"]