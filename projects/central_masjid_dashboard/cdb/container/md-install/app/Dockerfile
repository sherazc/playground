FROM openjdk:13
ADD ./cdb.jar cdb.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Dspring.profiles.active=dev", "-jar", "cdb.jar"]
