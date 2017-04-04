package com.sc.services;

public interface StatusUpdater {

    void updateCycleLog(String message);

    void updateCycleProgress(int maximumLimit, int currentProgress);

    void updateCycleLogAndProgress(String message, int maximumLimit, int currentProgress);

    void completeProcess();

    void processCanceled();

    void resetProgress();
}
