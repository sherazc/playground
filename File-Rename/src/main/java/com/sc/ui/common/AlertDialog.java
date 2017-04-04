package com.sc.ui.common;

import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.stage.Modality;
import javafx.stage.Stage;

public class AlertDialog {

    private AlertDialog() {
    }

    public static void display(String title, String message) {
        Stage stage = new Stage();
        stage.initModality(Modality.APPLICATION_MODAL);

        stage.setTitle(title);

        Label label = new Label(message);
        Button buttonOk = new Button("Ok");

        buttonOk.setOnAction(e -> {
            stage.close();
        });

        VBox layout = new VBox(10);
        layout.setAlignment(Pos.CENTER);
        layout.getChildren().addAll(label, buttonOk);

        stage.setScene(new Scene(layout, 250, 150));

        // UI Thread is going to wait till window/stage is closed
        stage.showAndWait();
    }
}
