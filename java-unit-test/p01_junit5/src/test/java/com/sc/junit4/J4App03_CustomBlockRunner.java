package com.sc.junit4;

import org.junit.runners.BlockJUnit4ClassRunner;
import org.junit.runners.model.FrameworkMethod;
import org.junit.runners.model.InitializationError;
import org.junit.runners.model.Statement;

// https://www.baeldung.com/junit-4-custom-runners
public class J4App03_CustomBlockRunner extends BlockJUnit4ClassRunner {
    public J4App03_CustomBlockRunner(Class<?> testClass) throws InitializationError {
        super(testClass);
    }

    @Override
    protected Statement methodInvoker(FrameworkMethod method, Object test) {
        System.out.println("Invoking Test Method: " + method.getName());
        return super.methodInvoker(method, test);
    }
}
