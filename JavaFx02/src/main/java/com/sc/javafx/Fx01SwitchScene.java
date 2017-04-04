package com.sc.javafx;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class Fx01SwitchScene extends Application {

    private Stage window;
    private Scene scene1;
    private Scene scene2;

    @Override
    public void start(Stage primaryStage) throws Exception {
        this.window = primaryStage;

        scene1 = createScene1();
        scene2 = createScene2();

        window.setScene(scene1);
        window.setTitle("Fx01 - Switch Scene");
        window.show();
    }

    private Scene createScene1() {

        Label label = new Label("This is scene 1");
        Button button = new Button("Goto Scene 2");
        button.setOnAction(e -> window.setScene(scene2));

        VBox layout = new VBox(20);
        layout.getChildren().addAll(label, button);
        return new Scene(layout, 200, 200);
    }

    private Scene createScene2() {

        Button button = new Button("Go back to Scene 1");
        button.setOnAction(e -> {
            window.setScene(scene1);
            window.setTitle("Fx01 - Title is changed");
        });

        StackPane layout = new StackPane();
        layout.getChildren().add(button);
        return new Scene(layout, 300, 300);
    }

    public static void main(String[] args) {
        launch();
    }
}
