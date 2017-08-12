package com.sc.ui.services;

import com.sc.services.StatusUpdater;
import com.sc.services.TimeRenameService;
import javafx.concurrent.Task;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

public class TimeRenameServiceTask extends Task<Void> {

    private TimeRenameService timeRenameService;
    private File sourceDirectory;
    private File destinationDirectory;
    private StatusUpdater statusUpdater;
    private Map<String, String> configuration;

    public TimeRenameServiceTask(File sourceDirectory, File destinationDirectory, StatusUpdater statusUpdater,
                                 String timeStampPattern) {
        this.sourceDirectory = sourceDirectory;
        this.destinationDirectory = destinationDirectory;
        this.statusUpdater = statusUpdater;
        configuration = new HashMap<>();
        configuration.put(TimeRenameService.CONFIG_TIMESTAMP_PATTERN_KEY,timeStampPattern);
    }

    @Override
    protected Void call() throws Exception {

        timeRenameService = new TimeRenameService();
        timeRenameService.handle(sourceDirectory.getAbsolutePath(), destinationDirectory.getAbsolutePath(),
                configuration, statusUpdater);
        return null;
    }

    public void cancelProcess() {
        timeRenameService.cancelProcess();
    }
}
