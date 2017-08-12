package com.sc.javafx;

import javafx.application.Platform;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.ProgressIndicator;
import javafx.scene.control.TextArea;

public class LongRunningTask extends javafx.concurrent.Task<Void> {

    private static final String[] seeds = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
            "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"};

    private int cycles;

    private long delayMilli;

    private TextArea textAreaLogs;

    private ProgressBar progressBar;

    private ProgressIndicator progressIndicator;

    private Label labelStatus;

    private Button buttonStart;

    private Button buttonStop;

    public LongRunningTask(int cycles, long delayMilli, TextArea textAreaLogs, ProgressBar progressBar,
                           ProgressIndicator progressIndicator, Label labelStatus,
                           Button buttonStart, Button buttonStop) {

        this.cycles = cycles;
        this.delayMilli = delayMilli;
        this.textAreaLogs = textAreaLogs;
        this.progressBar = progressBar;
        this.progressIndicator = progressIndicator;
        this.labelStatus = labelStatus;
        this.buttonStart = buttonStart;
        this.buttonStop = buttonStop;
    }

    protected Void call() throws Exception {
        BusinessService businessService = new BusinessService(delayMilli);
        updateStatus("Running LongRunningTask...");
        int i = 0;
        for (; i < cycles; i++) {
            if (isCancelled()) {
                break;
            }
            String businessLogicResult = businessService.callBusinessLogic(seeds[i % seeds.length] + " " + (i + 1));
            updateUiLogAndProgress(businessLogicResult, (i + 1), cycles);
        }
        if (isCancelled() && i < cycles) {
            updateUiLog("Process Stopped.");
        }
        updateStatus("LongRunningTask complete.");
        buttonStart.setDisable(false);
        buttonStop.setDisable(true);
        return null;
    }

    private void updateUiLogAndProgress(String logMessage, int currentCycle, int maximumCycles) {
        System.out.println(logMessage);
        Platform.runLater(() -> {
            textAreaLogs.appendText(logMessage + "\n");
            double progress = (double) currentCycle / maximumCycles;
            progressBar.setProgress(progress);
            progressIndicator.setProgress(progress);
        });
    }

    private void updateStatus(String status) {
        System.out.println(status);
        Platform.runLater(() -> {
            labelStatus.setText(status);
        });
    }

    private void updateUiLog(String logMessage) {
        System.out.println(logMessage);
        Platform.runLater(() -> {
            textAreaLogs.appendText(logMessage + "\n");
        });
    }
}
