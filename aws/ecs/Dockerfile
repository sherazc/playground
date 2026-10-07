FROM eclipse-temurin:21-jdk AS build
WORKDIR /build
COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN ./mvnw -q dependency:go-offline
COPY src src
RUN ./mvnw -q -DskipTests package

FROM eclipse-temurin:21-jre
RUN groupadd -g 2001 app && useradd -u 2001 -g 2001 -m -s /usr/sbin/nologin app \
    && mkdir /data && chown 2001:2001 /data
COPY --from=build /build/target/todo-0.0.1-SNAPSHOT.jar /app/app.jar
ENV APP_DB_PATH=/data/todo.db
USER app
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
