package com.sc.java18a.eg05InternetAddress;

import java.net.Inet4Address;
import java.net.Inet6Address;
import java.net.InetAddress;
import java.util.Arrays;

public class InetAddress17 {

    public static void main(String[] args) throws Exception {
        // All InetAddress for the domain
        InetAddress[] inetAddresses = InetAddress.getAllByName("www.google.com");
        System.out.println("All InetAddress = " + Arrays.toString(inetAddresses));
        System.out.println("IP4 length = " + inetAddresses[0].getAddress().length);
        System.out.println("IP6 length = " + inetAddresses[inetAddresses.length - 1].getAddress().length);

        // IP Address
        InetAddress address1 = InetAddress.getByName("www.google.com");
        System.out.println("Get IP address InetAddress.getHostAddress() = " + address1.getHostAddress());
        System.out.print("Raw IP InetAddress.getAddress() = ");

        // bit & 0xff to convert negative byte to positive
        for (byte bit : address1.getAddress()) {

            // Or add 256 to bit if its negative
            System.out.print((bit & 0xff) + " ");
        }
        System.out.println();
        // add 256 to bit if its negative
        for (byte bit : address1.getAddress()) {
            System.out.print((bit < 0 ? bit + 256 : bit) + " ");
        }
        System.out.println();

        // IP Type. IP4 or IP6
        System.out.println("Is IP4 = " + (address1.getAddress().length == 4));
        System.out.println("Is IP6 = " + (address1.getAddress().length == 16));

        System.out.println("Is IP4 = " + (address1 instanceof Inet4Address));
        System.out.println("Is IP6 = " + (address1 instanceof Inet6Address));

        // IP to host name
        // Will not always work. Works for localhost or in host file configuration or DNS address
        // This relience of host file changes in java 18 by the help of InetAddressResolver, and InetAddressResolverProvider
        InetAddress address2 = InetAddress.getByName("8.8.8.8");
        System.out.println("Reverse - IP to host name - 8.8.8.8 - InetAddress.getHostName() = " + address2.getHostName());
        System.out.println("Reverse - IP to host name - 8.8.8.8 - InetAddress.getCanonicalHostName() = " + address2.getCanonicalHostName());

        // Local host
        InetAddress address3 = InetAddress.getLocalHost();
        System.out.println("Local machine IP address = " + address3.getHostAddress());
        System.out.println("Local machine host name = " + address3.getHostName());

        // Loopback
        InetAddress address4 = InetAddress.getLoopbackAddress();
        System.out.println("Loopback IP address = " + address4.getHostAddress());
        System.out.println("Loopback host name = " + address4.getHostName());
    }
}
