FROM maven:3.9-ibm-semeru-21-noble AS build

WORKDIR /app

COPY pom.xml .

COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

COPY --from=build /app/target/*.jar bookingservice.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "bookingservice.jar"]