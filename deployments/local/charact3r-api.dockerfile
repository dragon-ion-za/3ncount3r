FROM charact3r-calllightning-cantrip-1

WORKDIR /api

COPY config/charact3r/** ./config/

CMD ["node", "api.bundle.js"]