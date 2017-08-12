package com.sc.util;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class PropertiesLoader {
    private static final Logger LOG = LoggerFactory.getLogger(PropertiesLoader.class);
    private final Map<String, Properties> propertiesData = new HashMap<>();
    private static PropertiesLoader propertiesLoader;
    private static String DEFAULT_PROPERTIES_FILE_NAME = "resources.properties";

    public static String getProperty(String propertyName) {
        return getProperty(DEFAULT_PROPERTIES_FILE_NAME, propertyName);
    }

    public static String getProperty(String fileName, String propertyName) {
        if (StringUtils.isBlank(fileName) || StringUtils.isBlank(propertyName)) {
            return null;
        }
        if (propertiesLoader == null) {
            propertiesLoader = new PropertiesLoader();
        }

        Properties properties = propertiesLoader.propertiesData.get(fileName);

        if (properties == null) {
            properties = propertiesLoader.loadPropertiesFile(fileName);
        }

        if (properties == null) {
            return null;
        } else {
            propertiesLoader.propertiesData.put(fileName, properties);
            return properties.getProperty(propertyName);
        }
    }

    private Properties loadPropertiesFile(String fileName) {
        Properties properties = new Properties();
        FileReader fileReader = null;
        try {

            File file = new File(fileName);

            if (!file.exists()) {
                URL resource = PropertiesLoader.class.getResource("/" + fileName);

                if (resource != null) {
                    file = new File(resource.getFile());
                }
            }

            if (!file.exists()) {
                return null;
            } else {
                fileReader = new FileReader(file);
                properties.load(fileReader);
            }
        } catch (Exception e) {
            LOG.error("Error loading properties file. " + fileName, e);
        } finally {
            if (fileReader != null) {
                try {
                    fileReader.close();
                } catch (IOException e) {
                    LOG.error("Error loading properties file. " + fileName, e);
                }
            }
        }

        if (properties == null || properties.size() < 1) {
            return null;
        } else {
            return properties;
        }
    }
}
