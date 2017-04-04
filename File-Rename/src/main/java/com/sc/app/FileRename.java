package com.sc.app;

import com.sc.services.FileHandlerService;
import com.sc.services.TimeRenameService;
import com.sc.util.PropertiesLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

public class FileRename {

    private static final Logger LOG = LoggerFactory.getLogger(FileRename.class);

    public static void main(String[] args) {

        LOG.debug("Working by file rename");

        String renameServiceName = PropertiesLoader.getProperty("rename.service");


        FileHandlerService renameService = null;

        if ("TimeRenameService".equalsIgnoreCase(renameServiceName)) {
            renameService = new TimeRenameService();
        }

        if (renameService == null) {
            LOG.error("Can not configure rename service. rename.service=" + renameServiceName);
            return;
        }

        String sourceDir = PropertiesLoader.getProperty("source.dir");
        String destDir = PropertiesLoader.getProperty("dest.dir");

        Map<String, String> configuration = new HashMap<>();
        configuration.put(TimeRenameService.CONFIG_TIMESTAMP_PATTERN_KEY, PropertiesLoader.getProperty("time.rename.service.date.pattern"));

        renameService.handle(sourceDir, destDir, configuration, null);

    }
}
