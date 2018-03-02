# Step 1: create maven project
```$ mvn archetype:generate```


#Step 2: create angular project inside maven project
cd project_java

```$ ng new project_ui```

#Step 3: Add Hash bang strategy 

in app.module.ts add HashLocationStrategy. This is done so that war paths don't
conflict with angular url

```providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],```

#Step 4: Create proxy for api calls 
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

#Step 5: Add proxy in package.json
update package.json and add proxy-config file in ng serve command.

```"start": "ng serve --proxy-config proxy-config.json",```

#Step 6: Build and deploy java war

This will build war file deploy it for services. Deploy on tomcat 
that is running on port 8080

```
$ cd project_java
$ mvn clean install
```

#Step 7: serve angular app
Serve angular application and start writing angular application. This will
run angular application on port 4200

```
$ cd project_ui
$ npm run start
```