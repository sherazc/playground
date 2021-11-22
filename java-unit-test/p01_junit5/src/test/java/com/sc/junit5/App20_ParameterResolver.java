package com.sc.junit5;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.*;

import java.lang.reflect.Parameter;
import java.util.Collections;


class App20_ParameterResolverTest {

    // Both class or method can be Extended
    @Test
    @ExtendWith({App20_ParameterResolver.class})
    void test01(String name, int times) {
        String string = String.join(", ", Collections.nCopies(times, name));
        Assertions.assertEquals("Sheraz, Sheraz", string);
    }
}

class App20_ParameterResolver implements ParameterResolver {

    // Check if parameter is supported
    @Override
    public boolean supportsParameter(
            ParameterContext parameterContext, ExtensionContext extensionContext)
            throws ParameterResolutionException {
        return true;
    }

    // Return value of the parameter
    @Override
    public Object resolveParameter(
            ParameterContext parameterContext, ExtensionContext extensionContext)
            throws ParameterResolutionException {
        if (!"test01".equals(extensionContext.getTestMethod().get().getName())) {
            return null;
        }
        Parameter parameter = parameterContext.getParameter();
        if (parameterContext.getIndex() == 0 && parameter.getType() == String.class) {
            return "Sheraz";
        } else if (parameterContext.getIndex() == 1 &&  "int".equals(parameter.getType().getName())){
            return 2;
        } else {
            return null;
        }
    }
}