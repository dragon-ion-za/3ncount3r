FROM 3ncount3r-calllightning-cantrip-5

WORKDIR /api

COPY config/3ncount3r/** ./

ENTRYPOINT ["dotnet", "DDD.3ncount3r.API.dll"]