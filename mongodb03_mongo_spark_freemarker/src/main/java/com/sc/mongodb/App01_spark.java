package com.sc.mongodb;

import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;

public class App01_spark {
    public static void main(String[] args) {

        Spark.setPort(8080);

        // First argument is the URI, and 2nd arg tell how to handle the request
        Spark.get("/", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                return "Hello World";
            }
        });

        Spark.get("/test", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                return "This is a test page";
            }
        });


        Spark.get("/echo/:things", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                return "Echoing... " + request.params(":things");
            }
        });

        System.out.println("Go to URL: http://localhost:8080/");
        System.out.println("Go to URL: http://localhost:8080/test");
        System.out.println("Go to URL: http://localhost:8080/echo/whatever");

    }
}
