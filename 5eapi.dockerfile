FROM ghcr.io/dragon-ion-za/5eapi:aid-3rdlevel

WORKDIR /api

COPY hostingConfigs/5eapi/** ./config/

CMD ["node", "api.bundle.js"]