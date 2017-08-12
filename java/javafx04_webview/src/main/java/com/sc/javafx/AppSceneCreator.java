package com.sc.javafx;

import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;

import java.io.IOException;

public class AppSceneCreator {
    public static final String APP_SCENE_LAYOUT = "/app-scene-layout.fxml";

    public Scene createMainScene() {
        Parent root = null;
        try {
            root = FXMLLoader.load(getClass().getResource(APP_SCENE_LAYOUT));
        } catch (IOException e) {
            e.printStackTrace();
        }
        Scene scene = new Scene(root, 700, 400);
        return scene;
    }
}
