package com.sc.app;

import com.sc.ui.AppSceneCreator;
import com.sc.ui.events.CloseAppEvent;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.stage.Stage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Main extends Application {

    private static final Logger LOG = LoggerFactory.getLogger(Main.class);
    public static Stage window;
    public static Application application;
    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) throws Exception {
        window = primaryStage;
        application = this;
        AppSceneCreator appSceneCreator = new AppSceneCreator();

        window.setTitle("File Rename");
        window.setScene(appSceneCreator.createMainScene());
        window.setOnCloseRequest(new CloseAppEvent(window));
        window.setMinHeight(500);
        window.setMinWidth(650);
        window.show();
    }
}
