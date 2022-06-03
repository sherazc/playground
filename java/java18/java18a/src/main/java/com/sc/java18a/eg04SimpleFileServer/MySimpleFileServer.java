package com.sc.java18a.eg04SimpleFileServer;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.SimpleFileServer;

import java.net.InetSocketAddress;
import java.nio.file.Path;

public class MySimpleFileServer {
    public static void main(String[] args) {

        HttpServer server = SimpleFileServer.createFileServer(
                new InetSocketAddress(8080),
                Path.of(".").toAbsolutePath(),
                SimpleFileServer.OutputLevel.VERBOSE);

        System.out.println("Starting server: http://localhost:8080");

        server.start();
    }
}
