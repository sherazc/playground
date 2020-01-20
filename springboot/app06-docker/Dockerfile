FROM openjdk:13
ADD ./target/app06-docker.jar /app/app06-docker.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Dspring.profiles.active=dev", "-jar", "/app/app06-docker.jar"]
