package com.sc.java18a.eg05InetAddress;

import java.net.InetAddress;

public class InetAddress18WithCustomResolver {

    public static void main(String[] args) throws Exception {
        System.setProperty(InetAddress18WithoutCustomResolver.USE_MY_CUSTOM_INET_RESOLVER, "true");
        InetAddress inetAddress2 = InetAddress.getByName(InetAddress18WithoutCustomResolver.MY_BAD_HOST);
        System.out.println(inetAddress2);
    }
}
