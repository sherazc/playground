# Step 1: create maven project
Create a java war project e.g. project_java using the command below

```$ mvn archetype:generate```


# Step 2: Update java war project and pom.xml

* Convert maven's jar project to war project
* Update pom.xml to add frontend-maven-plugin and maven-resources-plugin 
plugins
* Add /src/main/webapp/WEB-INF/web.xml file
* Add index.html as welcome file


```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xmlns:web="http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" version="2.5">
    <welcome-file-list>
        <welcome-file>index.html</welcome-file>
    </welcome-file-list>
</web-app>
```

# Step 3: create angular project inside maven project

```
$ cd project_java
$ ng new project_ui

```

# Step 4: Add Hash bang strategy 

In app.module.ts add HashLocationStrategy. This is done so that war paths don't
conflict with angular url

```providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],```

# Step 5: Create proxy for api calls 
By doing this any request to http://localhost:4200/api 
will be handle by tomcat's http://localhost:8080/api

create proxy-config.json and add this content to it
```
{
    "/api": {
        "target": "http://localhost:8080",
        "secure": false
    }
}
```

# Step 6: Add proxy in package.json
Update package.json and add proxy-config file in ng serve command.

```"start": "ng serve --proxy-config proxy-config.json",```

# Step 7: Build and deploy java war

This will build war file deploy it for services. Deploy on tomcat 
that is running on port 8080

```
$ cd project_java
$ mvn clean install
```

# Step 8: serve angular app
Serve angular application and start writing angular application. This will
run angular application on port 4200

```
$ cd project_ui
$ npm run start
```