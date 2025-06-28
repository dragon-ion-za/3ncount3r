FROM 3ncount3r-calllightning-cantrip-1

WORKDIR /api

COPY config/3ncount3r/** ./config/

CMD ["node", "api.bundle.js"]