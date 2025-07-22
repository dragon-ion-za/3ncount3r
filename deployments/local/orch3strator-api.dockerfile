FROM orch3strator-calllightning-cantrip-5

WORKDIR /api

COPY config/orch3strator/** ./

ENTRYPOINT ["dotnet", "DDD.orch3strator.dll"]