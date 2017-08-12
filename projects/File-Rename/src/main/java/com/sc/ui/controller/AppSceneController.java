package com.sc.ui.controller;

import com.sc.services.TimeRenameService;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.ProgressIndicator;
import javafx.scene.control.TextField;
import javafx.scene.web.WebView;

import java.net.URL;
import java.util.ResourceBundle;


public class AppSceneController implements Initializable {

    private AppSceneControllerHelper appSceneControllerHelper = new AppSceneControllerHelper();

    @FXML
    private TextField textFieldSrcDir;

    @FXML
    private TextField textFieldDestDir;

    @FXML
    private ComboBox<String> comboBoxTimeStampPattern;

    @FXML
    private ProgressBar progressBar;

    @FXML
    private ProgressIndicator progressIndicator;

    @FXML
    private WebView webViewLogs;

    @FXML
    private Label labelStatus;

    @FXML
    private Button buttonStartTimeRename;

    @FXML
    private Button buttonCancelTimeRename;


    @FXML
    public void handleSrcDirChooser(ActionEvent event) {
        appSceneControllerHelper.showDirChooser(textFieldSrcDir, "Select Source Directory");
    }

    @FXML
    public void handleDestDirChooser(ActionEvent event) {
        appSceneControllerHelper.showDirChooser(textFieldDestDir, "Select Destination Directory");
    }

    @FXML
    public void handleStartTimeStamp(ActionEvent event) {
        appSceneControllerHelper.startTimeStamp(textFieldSrcDir, textFieldDestDir,
                TimeRenameService.PATTERN_TYPES.get(comboBoxTimeStampPattern.getValue()));
    }

    @FXML
    public void handleCancleTimeStamp(ActionEvent event) {
        appSceneControllerHelper.cancelProcess();
    }

    @FXML
    public void handleClearLogs(ActionEvent event) {
        // textAreaLogs.clear();
    }

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        comboBoxTimeStampPattern.getItems().addAll(TimeRenameService.PATTERN_TYPE_NAMES);
        comboBoxTimeStampPattern.setValue(TimeRenameService.PATTERN_TYPE_NAMES[0]);
        appSceneControllerHelper.setLabelStatus(labelStatus);
        appSceneControllerHelper.setProgressBar(progressBar);
        appSceneControllerHelper.setProgressIndicator(progressIndicator);
        appSceneControllerHelper.setWebViewLogs(webViewLogs);
        appSceneControllerHelper.setButtonStartTimeRename(buttonStartTimeRename);
        appSceneControllerHelper.setButtonCancelTimeRename(buttonCancelTimeRename);
        buttonStartTimeRename.setDisable(false);
        buttonCancelTimeRename.setDisable(true);
    }
}
