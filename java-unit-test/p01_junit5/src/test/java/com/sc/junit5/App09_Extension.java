package com.sc.junit5;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.AfterEachCallback;
import org.junit.jupiter.api.extension.BeforeEachCallback;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.extension.ExtensionContext;


@ExtendWith({
        MyBeforeEachCallbackExtension.class,
        MyAfterEachCallbackExtension.class
})
class App09_Extension {
    @Test
    void test01() {
        System.out.println("Running test01");
    }

    @Test
    void test02() {
        System.out.println("Running test02");
    }
}

class MyBeforeEachCallbackExtension implements BeforeEachCallback {
    @Override
    public void beforeEach(ExtensionContext extensionContext) throws Exception {
        System.out.println("MyBeforeEachCallbackExtension. " + extensionContext.getDisplayName());
    }
}

class MyAfterEachCallbackExtension implements AfterEachCallback {
    @Override
    public void afterEach(ExtensionContext extensionContext) throws Exception {
        System.out.println("MyAfterEachCallbackExtension. " + extensionContext.getDisplayName());
    }
}