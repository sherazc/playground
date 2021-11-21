package com.sc.junit5;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.*;

import java.lang.reflect.Parameter;
import java.util.Collections;

@ExtendWith({App20_ParameterResolver.class})
class App20_ParameterResolverTest {
    @Test
    void test01(String name, int times) {
        String string = String.join(", ", Collections.nCopies(times, name));
        Assertions.assertEquals("Sheraz, Sheraz", string);
    }
}

class App20_ParameterResolver implements ParameterResolver {

    @Override
    public boolean supportsParameter(
            ParameterContext parameterContext, ExtensionContext extensionContext)
            throws ParameterResolutionException {
        return true;
    }

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