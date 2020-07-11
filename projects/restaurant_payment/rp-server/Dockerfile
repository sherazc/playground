FROM openjdk:13-jdk-alpine

# App container user
# RUN addgroup -S spring && adduser -S spring -G spring
# USER spring:spring

EXPOSE 8082
EXPOSE 8084
EXPOSE 8086

ARG JAR_FILE=app/target/*.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]
