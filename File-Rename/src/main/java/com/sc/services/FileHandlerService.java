package com.sc.services;

import java.util.Map;

public interface FileHandlerService {

    void handle(String source, String destination, Map<String, String> configs, StatusUpdater statusUpdater);

    void cancelProcess();
}
