FROM charact3r-calllightning-cantrip-5

WORKDIR /api

COPY config/charact3r/** ./

ENTRYPOINT ["dotnet", "DDD.charact3r.API.dll"]