package com.sc.javafx;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.stage.Modality;
import javafx.stage.Stage;

public class Fx02AlertBox extends Application {
    @Override
    public void start(Stage primaryStage) throws Exception {

        Button button = new Button("Alert Me");
        button.setOnAction(e -> Fx03MyAlertBox.display("My Alert Box", "My Alert box Message."));

        StackPane layout = new StackPane();
        layout.getChildren().add(button);
        Scene scene = new Scene(layout, 200, 200);

        primaryStage.setScene(scene);
        primaryStage.setTitle("Fx02");
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch();
    }
}

class Fx03MyAlertBox {
    private Fx03MyAlertBox() {
    }

    public static void display(String title, String message) {

        Stage stage = new Stage();
        stage.initModality(Modality.APPLICATION_MODAL);

        Button button = new Button("Ok");
        button.setOnAction(e -> stage.close());
        Label label = new Label(message);


        VBox layout = new VBox(10);
        layout.setAlignment(Pos.CENTER);
        layout.getChildren().addAll(label, button);

        stage.setScene(new Scene(layout, 150, 100));
        stage.setTitle(title);
        stage.showAndWait();
    }
}
