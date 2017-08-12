package com.sc.javafx;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class App extends Application {

    public static Stage window;

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) throws Exception {
        window = primaryStage;
        Parent root = null;
        try {
            root = FXMLLoader.load(getClass().getResource("/app-scene-layout.fxml"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        Scene scene = new Scene(root, 600, 400);
        window.setTitle("App");
        window.setScene(scene);
        window.setMinHeight(500);
        window.setMinWidth(650);
        window.show();
    }
}
