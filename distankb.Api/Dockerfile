FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build

WORKDIR /app
ENV HOME=/root
ENV ASPNETCORE_ENVIRONMENT Development

COPY Distankb.Api.sln .
RUN mkdir Distankb.Api
COPY Distankb.Api/Distankb.Api.csproj ./Distankb.Api

RUN dotnet restore

COPY . .

RUN dotnet publish Distankb.Api/Distankb.Api.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build /app/out ./

ENV DOTNET_RUNNING_IN_CONTAINER=true
ENTRYPOINT ["dotnet", "Distankb.Api.dll"]