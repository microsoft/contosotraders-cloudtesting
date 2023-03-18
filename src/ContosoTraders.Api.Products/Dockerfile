FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["ContosoTraders.Api.Products/ContosoTraders.Api.Products.csproj", "ContosoTraders.Api.Products/"]
COPY ["ContosoTraders.Api.Core/ContosoTraders.Api.Core.csproj", "ContosoTraders.Api.Core/"]
RUN dotnet restore "ContosoTraders.Api.Products/ContosoTraders.Api.Products.csproj"
COPY . .
WORKDIR "/src/ContosoTraders.Api.Products"
RUN dotnet build "ContosoTraders.Api.Products.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ContosoTraders.Api.Products.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ContosoTraders.Api.Products.dll"]