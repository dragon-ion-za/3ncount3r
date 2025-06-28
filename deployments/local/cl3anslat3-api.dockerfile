FROM cl3anslat3-calllightning-cantrip-1

WORKDIR /api

COPY config/cl3anslat3/** ./config/

CMD ["node", "api.bundle.js"]