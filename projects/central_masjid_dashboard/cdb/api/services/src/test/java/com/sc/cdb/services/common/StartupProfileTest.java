package com.sc.cdb.services.common;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest()
@ContextConfiguration(classes = StartupProfileTest.TestConfiguration.class)
@ActiveProfiles({"profile1", "profile2"})
public class StartupProfileTest {

    @Autowired
    private StartupProfile startupProfile;

    @Test
    public void testProfile() {
        assertFalse(startupProfile.isActiveProfile(null));
        assertFalse(startupProfile.isActiveProfile(""));
        assertFalse(startupProfile.isActiveProfile(" "));
        assertTrue(startupProfile.isActiveProfile("profile1"));
        assertTrue(startupProfile.isActiveProfile("profile2"));
        assertFalse(startupProfile.isActiveProfile("profile3"));
    }

    @Configuration
    static class TestConfiguration {
        @Bean
        public StartupProfile startupProfile() {
            return new StartupProfileImpl();
        }
    }
}