package com.sc.mn;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import java.util.Collections;
import java.util.Map;

@Controller
public class HomeController {

    @Get
    public Map<String, Object> index() {
        return Collections.singletonMap("message", "Hello World");
    }

    @Get(value = "/index2")
    public Map<String, Object> index2() {
        return Collections.singletonMap("message", "Hello World from index 2");
    }
}
