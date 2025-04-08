# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY crea.sln .
COPY CriminalSearchAPI/CriminalSearchAPI.csproj CriminalSearchAPI/

# Restore dependencies
RUN dotnet restore crea.sln

# Copy everything and publish
COPY . .
WORKDIR /src/CriminalSearchAPI
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "CriminalSearchAPI.dll"]
