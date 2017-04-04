package com.sc.javafx;

import javafx.application.Application;
import javafx.stage.Stage;

/**
 * Hello world!
 *
 */
public class App extends Application {

    public static Stage window;
    public static Application application;
    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) throws Exception {
        application = this;
        window = primaryStage;
        AppSceneCreator appSceneCreator = new AppSceneCreator();

        window.setTitle("File Rename");
        window.setScene(appSceneCreator.createMainScene());
        window.setMinHeight(500);
        window.setMinWidth(650);
        window.show();
    }
}
