package com.sc.ui.controller;

import com.sc.app.Main;
import com.sc.ui.common.AlertDialog;
import com.sc.ui.services.TimeRenameServiceTask;
import com.sc.ui.services.TimeStampUiStatusUpdater;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.ProgressIndicator;
import javafx.scene.control.TextField;
import javafx.scene.web.WebView;
import javafx.stage.DirectoryChooser;
import org.apache.commons.lang3.StringUtils;

import java.io.File;

public class AppSceneControllerHelper {

    private ProgressBar progressBar;
    private ProgressIndicator progressIndicator;
    private Label labelStatus;
    private Button buttonStartTimeRename;
    private Button buttonCancelTimeRename;
    private TimeStampUiStatusUpdater timeStampUiStatusUpdater;
    private TimeRenameServiceTask timeRenameServiceTask;
    private WebView webViewLogs;

    public void showDirChooser(TextField textFieldDir, String title) {
        DirectoryChooser directoryChooser = new DirectoryChooser();
        directoryChooser.setTitle(title);
        if (StringUtils.isNotBlank(textFieldDir.getText())) {
            File initialDirectory = new File(textFieldDir.getText().trim());
            if (initialDirectory.exists()) {
                directoryChooser.setInitialDirectory(initialDirectory);
            }
        }
        File selectedDirectory = directoryChooser.showDialog(Main.window);

        if (selectedDirectory != null && selectedDirectory.exists()) {
            textFieldDir.setText(selectedDirectory.getAbsolutePath());
        }
    }

    public void startTimeStamp(TextField textFieldSrcDir, TextField textFieldDestDir, String timeStampPattern) {
        String srcDirStr = textFieldSrcDir.getText();
        String destDirStr = textFieldDestDir.getText();
        if (StringUtils.isBlank(srcDirStr) || StringUtils.isBlank(destDirStr)) {
            AlertDialog.display("Missing Source Or Destination", "Please specify Source and Destination folder.");
            return;
        }

        File srcDir = new File(srcDirStr.trim());
        File destDir = new File(destDirStr.trim());

        if (!srcDir.exists() || srcDir.isFile()) {
            AlertDialog.display("Invalid Source", "Invalid Source folder.");
            return;
        }

        if (!destDir.exists() || destDir.isFile()) {
            AlertDialog.display("Invalid Destination", "Invalid destination folder.");
            return;
        }

        timeStampUiStatusUpdater = new TimeStampUiStatusUpdater(progressBar,
                progressIndicator, webViewLogs, labelStatus, buttonStartTimeRename, buttonCancelTimeRename);
        timeRenameServiceTask = new TimeRenameServiceTask(srcDir, destDir, timeStampUiStatusUpdater, timeStampPattern);
        new Thread(timeRenameServiceTask).start();
    }

    public void cancelProcess() {
        timeRenameServiceTask.cancelProcess();
    }

    public void setProgressBar(ProgressBar progressBar) {
        this.progressBar = progressBar;
    }

    public void setProgressIndicator(ProgressIndicator progressIndicator) {
        this.progressIndicator = progressIndicator;
    }

    public void setLabelStatus(Label labelStatus) {
        this.labelStatus = labelStatus;
    }

    public void setButtonStartTimeRename(Button buttonStartTimeRename) {
        this.buttonStartTimeRename = buttonStartTimeRename;
    }

    public void setButtonCancelTimeRename(Button buttonCancelTimeRename) {
        this.buttonCancelTimeRename = buttonCancelTimeRename;
    }

    public void setWebViewLogs(WebView webViewLogs) {
        this.webViewLogs = webViewLogs;
    }
}
