package com.sc.ehcache;

import net.sf.ehcache.CacheManager;

public class HelloWorldEhCache {
    // http://www.mkyong.com/ehcache/ehcache-hello-world-example/
    // http://blog.goyello.com/2010/07/29/quick-start-with-ehcache-annotations-for-spring/
    public static void main(String[] args) {
        // 1. Create Cache Manager
        CacheManager cacheManager = CacheManager.getInstance();
        System.out.println(cacheManager);
        cacheManager.shutdown();

    }
}
