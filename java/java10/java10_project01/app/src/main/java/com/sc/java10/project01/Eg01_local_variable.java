package com.sc.java10.project01;

import java.net.http.HttpClient;
import java.util.List;

public class Eg01_local_variable {
    public static void main(String[] args) {
        var i = 10;
        var hello = "Hello world!";
        var list = List.of(1, 2, 3, 4, 5);
        var httpClient = HttpClient.newBuilder().build();
    }
}
