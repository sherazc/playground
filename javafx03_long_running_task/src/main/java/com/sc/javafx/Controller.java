package com.sc.javafx;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.ProgressIndicator;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;

import java.net.URL;
import java.util.ResourceBundle;

public class Controller implements Initializable {

    @FXML
    private TextField textFieldDelayMilliSeconds;

    @FXML
    private TextField textFieldNumberOfCycles;

    @FXML
    private TextArea textAreaLogs;

    @FXML
    private Button buttonStart;

    @FXML
    private Button buttonStop;

    @FXML
    private ProgressBar progressBar;

    @FXML
    private ProgressIndicator progressIndicator;

    @FXML
    private Label labelStatus;

    private LongRunningTask longRunningTask;

    @FXML
    public void handleButtonStart(ActionEvent event) {
        buttonStart.setDisable(true);
        buttonStop.setDisable(false);
        getTextAreaLogs().clear();
        System.out.println("Start Button Clicked");
        longRunningTask = new LongRunningTask(
                Integer.parseInt(textFieldNumberOfCycles.getText()),
                Long.parseLong(textFieldDelayMilliSeconds.getText()),
                textAreaLogs, progressBar, progressIndicator, labelStatus, buttonStart, buttonStop);
        new Thread(longRunningTask).start();
    }

    @FXML
    public void handleButtonStop(ActionEvent event) {
        buttonStart.setDisable(false);
        buttonStop.setDisable(true);
        System.out.println("Stopped Button Clicked");
        longRunningTask.cancel();
    }

    @FXML
    public void handleButtonClearLogs(ActionEvent event) {
        getTextAreaLogs().clear();
    }

    public void initialize(URL location, ResourceBundle resources) {
        buttonStart.setDisable(false);
        buttonStop.setDisable(true);

//        textAreaLogs.textProperty().addListener(new ChangeListener<String>() {
//            public void changed(ObservableValue<? extends String> observable, String oldValue, String newValue) {
//                textAreaLogs.setScrollTop(Double.MAX_VALUE); //this will scroll to the bottom
//            }
//        });

        App.window.setOnCloseRequest(event -> {
            if (longRunningTask != null) {
                longRunningTask.cancel();
            }
        });
        System.out.println("initializing");
    }

    public TextField getTextFieldDelayMilliSeconds() {
        return textFieldDelayMilliSeconds;
    }

    public void setTextFieldDelayMilliSeconds(TextField textFieldDelayMilliSeconds) {
        this.textFieldDelayMilliSeconds = textFieldDelayMilliSeconds;
    }

    public TextField getTextFieldNumberOfCycles() {
        return textFieldNumberOfCycles;
    }

    public void setTextFieldNumberOfCycles(TextField textFieldNumberOfCycles) {
        this.textFieldNumberOfCycles = textFieldNumberOfCycles;
    }

    public TextArea getTextAreaLogs() {
        return textAreaLogs;
    }

    public void setTextAreaLogs(TextArea textAreaLogs) {
        this.textAreaLogs = textAreaLogs;
    }

    public Button getButtonStart() {
        return buttonStart;
    }

    public void setButtonStart(Button buttonStart) {
        this.buttonStart = buttonStart;
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

    public Label getLabelStatus() {
        return labelStatus;
    }

    public void setLabelStatus(Label labelStatus) {
        this.labelStatus = labelStatus;
    }
}