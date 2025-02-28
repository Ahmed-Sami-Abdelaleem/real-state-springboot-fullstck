# First stage: Build the JAR using Maven with Java 21
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build the project
COPY src ./src
RUN mvn package -DskipTests

# Second stage: Run the JAR using Java 23
FROM eclipse-temurin:23-jdk-alpine

WORKDIR /app

# Copy the built JAR from the previous stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
