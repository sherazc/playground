package com.sc.fxappjre;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.net.URL;

public class App extends Application {
    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) throws Exception {
        URL mainControllerURL = getClass().getResource("/layouts/MainController.fxml");

        Parent root = FXMLLoader.load(mainControllerURL);
        primaryStage.setTitle("Java FX App");
        primaryStage.setScene(new Scene(root, 600, 400));
        primaryStage.show();
    }
}
