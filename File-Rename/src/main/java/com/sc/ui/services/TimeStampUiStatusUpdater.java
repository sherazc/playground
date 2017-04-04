package com.sc.ui.services;

import com.sc.services.StatusUpdater;
import javafx.application.Platform;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.ProgressIndicator;
import javafx.scene.control.TextArea;
import javafx.scene.web.WebView;

public class TimeStampUiStatusUpdater implements StatusUpdater {

    private ProgressBar progressBar;
    private ProgressIndicator progressIndicator;
    @Deprecated
    private TextArea textAreaLogs;
    private Label labelStatus;
    private Button buttonStartTimeRename;
    private Button buttonCancelTimeRename;
    private WebViewLogsHandler webViewLogsHandler;

    @Deprecated
    public TimeStampUiStatusUpdater(ProgressBar progressBar, ProgressIndicator progressIndicator,
                                    TextArea textAreaLogs, Label labelStatus, Button buttonStartTimeRename,
                                    Button buttonCancelTimeRename) {
        this.progressBar = progressBar;
        this.progressIndicator = progressIndicator;
        this.textAreaLogs = textAreaLogs;
        this.labelStatus = labelStatus;
        this.buttonStartTimeRename = buttonStartTimeRename;
        this.buttonCancelTimeRename = buttonCancelTimeRename;
    }


    public TimeStampUiStatusUpdater(ProgressBar progressBar, ProgressIndicator progressIndicator,
                                    WebView webViewLogs, Label labelStatus, Button buttonStartTimeRename,
                                    Button buttonCancelTimeRename) {
        this.progressBar = progressBar;
        this.progressIndicator = progressIndicator;
        this.labelStatus = labelStatus;
        this.buttonStartTimeRename = buttonStartTimeRename;
        this.buttonCancelTimeRename = buttonCancelTimeRename;
        try {
            webViewLogsHandler = new WebViewLogsHandler(webViewLogs, "/ui/logs_init.html");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }



    @Override
    public void updateCycleLog(String message) {
        Platform.runLater(() -> {
            getTextAreaLogs().appendText(message + "\n");
            getTextAreaLogs().setScrollTop(Double.MAX_VALUE);
        });
    }

    @Override
    public void updateCycleProgress(int maximumLimit, int currentProgress) {
        Platform.runLater(() -> {
            double progressPercentage = ((double) currentProgress) / maximumLimit;
            progressBar.setProgress(progressPercentage);
            progressIndicator.setProgress(progressPercentage);
        });
    }


    @Override
    public void updateCycleLogAndProgress(String message, int maximumLimit, int currentProgress) {
        Platform.runLater(() -> {
            getTextAreaLogs().appendText(message + "\n");
            getTextAreaLogs().setScrollTop(Double.MAX_VALUE);
            double progressPercentage = ((double) currentProgress) / maximumLimit;
            progressBar.setProgress(progressPercentage);
            progressIndicator.setProgress(progressPercentage);
        });
    }


    @Override
    public void completeProcess() {
        Platform.runLater(() -> {
            labelStatus.setText("Complete!");
            getTextAreaLogs().appendText("Done!");
            getTextAreaLogs().setScrollTop(Double.MAX_VALUE);
            buttonStartTimeRename.setDisable(false);
            buttonCancelTimeRename.setDisable(true);
        });
    }

    public void processCanceled() {
        Platform.runLater(() -> {
            getTextAreaLogs().appendText("Canceled");
            labelStatus.setText("Canceled");
            buttonStartTimeRename.setDisable(false);
            buttonCancelTimeRename.setDisable(true);
        });
    }

    @Override
    public void resetProgress() {
        Platform.runLater(() -> {
            progressBar.setProgress(0);
            progressIndicator.setProgress(0);
            getTextAreaLogs().setText("");
            getLabelStatus().setText("");
            buttonStartTimeRename.setDisable(true);
            buttonCancelTimeRename.setDisable(false);
        });
    }

    public ProgressBar getProgressBar() {
        return progressBar;
    }

    public void setProgressBar(ProgressBar progressBar) {
        this.progressBar = progressBar;
    }

    public ProgressIndicator getProgressIndicator() {
        return progressIndicator;
    }

    public void setProgressIndicator(ProgressIndicator progressIndicator) {
        this.progressIndicator = progressIndicator;
    }

    @Deprecated
    public TextArea getTextAreaLogs() {
        return textAreaLogs;
    }

    @Deprecated
    public void setTextAreaLogs(TextArea textAreaLogs) {
        this.textAreaLogs = textAreaLogs;
    }

    public Label getLabelStatus() {
        return labelStatus;
    }

    public void setLabelStatus(Label labelStatus) {
        this.labelStatus = labelStatus;
    }
}
