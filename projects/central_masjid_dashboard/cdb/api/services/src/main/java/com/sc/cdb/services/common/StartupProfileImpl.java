package com.sc.cdb.services.common;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StartupProfileImpl implements StartupProfile {

    private List<String> activeProfilesList = new ArrayList<>();

    @Override
    public boolean isActiveProfile(String profileName) {
        if (StringUtils.isBlank(profileName)) {
            return false;
        }
        return activeProfilesList.contains(profileName);
    }

    @Value("${spring.profiles.active}")
    public void setActiveProfiles(String activeProfiles) {
        if (activeProfiles != null) {
            activeProfilesList = List.of(activeProfiles.split(",")).stream()
                    .map(String::trim)
                    .collect(Collectors.toList());
        }
    }
}
