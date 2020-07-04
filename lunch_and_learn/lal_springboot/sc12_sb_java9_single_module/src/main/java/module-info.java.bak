module com.sc.sb.single.module.app {
    requires spring.web;
    requires spring.data.jpa;
    requires spring.core;
    requires spring.context;

    requires java.persistence;
//    requires lombok;
    requires spring.boot;
    requires spring.boot.autoconfigure;
    // requires spring.boot.devtools;
    // exports com.sc.java9 to spring.boot.devtools;
    exports com.sc.java9 ;
    requires com.fasterxml.jackson.databind;
    opens com.sc.java9 to spring.core;
    opens com.sc.java9.controller to spring.core;
    opens com.sc.java9.entity to spring.core;
    opens com.sc.java9.repository to spring.core;
    opens com.sc.java9.service to spring.core;
    requires jdk.unsupported;
    requires net.bytebuddy;
    requires java.instrument;

}