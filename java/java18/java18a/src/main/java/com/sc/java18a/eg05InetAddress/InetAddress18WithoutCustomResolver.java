package com.sc.java18a.eg05InetAddress;

import java.net.InetAddress;

public class InetAddress18WithoutCustomResolver {

    public static final String USE_MY_CUSTOM_INET_RESOLVER = "use.my.custom.inet.resolver";
    public static final String MY_BAD_HOST = "www.sheraz.com";

    public static void main(String[] args) throws Exception {

        System.setProperty(USE_MY_CUSTOM_INET_RESOLVER, "false");
        try {
            InetAddress inetAddress1 = InetAddress.getByName(MY_BAD_HOST);
        } catch (Exception e) {
            System.out.println("Throws exception because can not find. " + MY_BAD_HOST);
        }
    }
}
