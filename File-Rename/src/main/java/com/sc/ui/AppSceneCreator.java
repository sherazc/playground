package com.sc.ui;

import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

public class AppSceneCreator {
    private static final Logger LOG = LoggerFactory.getLogger(AppSceneCreator.class);
    public static final String APP_SCENE_LAYOUT = "/ui/layout/app-scene-layout.fxml";

    public Scene createMainScene() {
        Parent root = null;
        try {
            root = FXMLLoader.load(getClass().getResource(APP_SCENE_LAYOUT));
        } catch (IOException e) {
            LOG.error("Failed to load " + APP_SCENE_LAYOUT, e);
        }
        Scene scene = new Scene(root, 600, 400);
        return scene;
    }
}
