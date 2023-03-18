FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["ContosoTraders.Api.Carts/ContosoTraders.Api.Carts.csproj", "ContosoTraders.Api.Carts/"]
COPY ["ContosoTraders.Api.Core/ContosoTraders.Api.Core.csproj", "ContosoTraders.Api.Core/"]
RUN dotnet restore "ContosoTraders.Api.Carts/ContosoTraders.Api.Carts.csproj"
COPY . .
WORKDIR "/src/ContosoTraders.Api.Carts"
RUN dotnet build "ContosoTraders.Api.Carts.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ContosoTraders.Api.Carts.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ContosoTraders.Api.Carts.dll"]