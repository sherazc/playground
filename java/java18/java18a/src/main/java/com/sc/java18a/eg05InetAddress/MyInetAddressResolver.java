package com.sc.java18a.eg05InetAddress;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.net.spi.InetAddressResolver;
import java.util.stream.Stream;

/**
 * This is similar to creating system host file.
 * If we want to host to resolve to custom IP address or InetAddress creates InetAddressResolver
 *
 * To configure it
 * - Implement java.net.spi.InetAddressResolver
 * - Extend java.net.spi.InetAddressResolverProvider
 * - Register custom InetAddressResolverProvider in META-INF/services/java.net.spi.InetAddressResolverProvider
 */

public class MyInetAddressResolver implements InetAddressResolver {

    @Override
    public Stream<InetAddress> lookupByName(String host, LookupPolicy lookupPolicy) throws UnknownHostException {
        return Stream.of(InetAddress.getByName("127.0.0.1"));
    }

    @Override
    public String lookupByAddress(byte[] rawAddress) throws UnknownHostException {
        // Not implemented
        throw new UnsupportedOperationException();
    }
}
