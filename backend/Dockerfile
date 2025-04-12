FROM amazoncorretto:21 AS base-jdk

FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /backend

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

FROM amazoncorretto:21-alpine

WORKDIR /backend

COPY --from=build /backend/target/backend-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/backend/backend-0.0.1-SNAPSHOT.jar"]