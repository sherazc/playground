package com.sc.s4.domain;

import javax.ws.rs.FormParam;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.PathParam;
import java.util.List;


/**
 * @FormParam, @HeaderParam:  Its better to make it String because of these conditions:
 * Reference: https://jax-rs-spec.java.net/nonav/2.0/apidocs/javax/ws/rs/FormParam.html
 * https://jax-rs-spec.java.net/nonav/2.0/apidocs/javax/ws/rs/HeaderParam.html
 *
 * 1. Be a primitive type
 * 2. Have a constructor that accepts a single String argument
 * 3. Have a static method named valueOf or fromString that accepts a single
 * 4. Have a registered implementation of ParamConverterProvider JAX-RS extension SPI that returns a ParamConverter instance capable of a "from string" conversion for the type.
 * String argument (see, for example, Integer.valueOf(String))
 * 5. Be List<T>, Set<T> or SortedSet<T>, where T satisfies 2, 3 or 4 above. The resulting collection is read-only.
 */

public class RestWsEmployee {

    @PathParam("eid")
    private Long id;

    @FormParam("ename")
    private String name;

    @FormParam("eage")
    private String age;

    @FormParam("elocations")
    private List<String> locations;

    @HeaderParam("esecret-seed")
    private String secretSeed;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public List<String> getLocations() {
        return locations;
    }

    public void setLocations(List<String> locations) {
        this.locations = locations;
    }

    public String getSecretSeed() {
        return secretSeed;
    }

    public void setSecretSeed(String secretSeed) {
        this.secretSeed = secretSeed;
    }
}
