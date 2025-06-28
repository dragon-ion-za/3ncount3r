FROM orch3strator-calllightning-cantrip-1

WORKDIR /api

COPY config/orch3strator/** ./config/

CMD ["node", "api.bundle.js"]