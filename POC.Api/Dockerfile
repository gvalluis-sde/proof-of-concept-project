FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY . . 
RUN dotnet restore "Posterr.Api.csproj"
COPY . . 
WORKDIR "/src"
RUN dotnet build "Posterr.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Posterr.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish 

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Posterr.Api.dll"]


















# #Stage 1 : Build
# FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
# WORKDIR /src

# #restore
# COPY . .
# RUN dotnet restore "Posterr.Api.csproj"

# #build
# COPY . .
# #WORKDIR /src/Posterr.Api
# RUN dotnet build "Posterr.Api.csproj" -c Release -o /app/build

# #Stage 2 : Publish
# FROM build AS publish
# RUN dotnet publish "Posterr.Api.csproj" -c Release -o /app/publish

# #Stage 3 : Run
# FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
# ENV ASPNETCORE_HTTP_PORTS=5001
# EXPOSE 5000 5001
# WORKDIR /app
# COPY --from=publish /app/publish .
# ENTRYPOINT ["dotnet", "Posterr.Api.dll"]

#FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
#WORKDIR /src
#RUN ls -lR /src
#COPY . .
#RUN ls -lR /src
#RUN dotnet restore "Posterr.Api.csproj"
#RUN dotnet build "Posterr.Api.csproj" -c Release -o /app/build
#
##Stage 2 : Publish
#FROM build AS publish
#RUN dotnet publish "Posterr.Api.csproj" -c Release -o /app/publish
#
#
#FROM base AS final
#ENV ASPNETCORE_HTTP_PORTS=5000
#EXPOSE 5000
#WORKDIR /app
#COPY --from=publish /app/publish .
#