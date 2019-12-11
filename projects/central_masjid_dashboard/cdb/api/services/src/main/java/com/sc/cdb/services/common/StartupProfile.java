package com.sc.cdb.services.common;

public interface StartupProfile {
    enum types {dev, prod}

    boolean isActiveProfile(String profileName);
}
