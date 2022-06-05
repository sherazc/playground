package com.sc.java18a.eg05InetAddress;

import java.net.spi.InetAddressResolver;
import java.net.spi.InetAddressResolverProvider;

public class MyInetAddressResolverProvider extends InetAddressResolverProvider {
    @Override
    public InetAddressResolver get(Configuration configuration) {

        boolean useCustom = Boolean.parseBoolean(System.getProperty(InetAddress18WithoutCustomResolver.USE_MY_CUSTOM_INET_RESOLVER));
        if (useCustom) {
            return new MyInetAddressResolver();
        } else {
            return configuration.builtinResolver();
        }
    }

    @Override
    public String name() {
        return "My customer InetAddressResolverProvider";
    }
}
