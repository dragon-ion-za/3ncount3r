FROM ghcr.io/dragon-ion-za/3ncount3r-spa:adamantinearmor-10thlevel

WORKDIR /spa

COPY hostingConfigs/spa/** ./config/

CMD ["node", "spa.bundle.js"]