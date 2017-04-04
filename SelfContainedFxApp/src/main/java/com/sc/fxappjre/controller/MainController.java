package com.sc.fxappjre.controller;

import com.sc.util.PropertiesLoader;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.Label;

import java.net.URL;
import java.util.Properties;
import java.util.ResourceBundle;

public class MainController implements Initializable {

    private static int clickCount;

    @FXML
    private Label propertyLabel;

    @FXML
    private Label countLabel;

    @FXML
    private void handleHelloWorldButton(ActionEvent event) {
        countLabel.setText("Total count: " + ++clickCount);
    }

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        propertyLabel.setText(PropertiesLoader.getProperty("prop1"));
    }
}
