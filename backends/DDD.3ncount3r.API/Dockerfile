FROM mcr.microsoft.com/dotnet/sdk:8.0

WORKDIR /api

RUN dotnet dev-certs https
RUN dotnet dev-certs https --trust

COPY bin/Release/net8.0/** ./

ENTRYPOINT ["dotnet", "DDD.3ncount3r.API.dll"]
