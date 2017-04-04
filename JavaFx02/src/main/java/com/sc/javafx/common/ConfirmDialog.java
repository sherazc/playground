package com.sc.javafx.common;

import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.stage.Modality;
import javafx.stage.Stage;

public class ConfirmDialog {

    private static ConfirmResult confirmResult = ConfirmResult.NONE;

    private ConfirmDialog() {
    }

    public static ConfirmResult display(String title, String message) {
        Stage stage = new Stage();
        stage.initModality(Modality.APPLICATION_MODAL);

        stage.setTitle(title);

        Label label = new Label(message);

        Button buttonYes = new Button("Yes");
        Button buttonNo = new Button("No");

        buttonYes.setOnAction(e -> {
            confirmResult = ConfirmResult.YES;
            stage.close();
        });

        buttonNo.setOnAction(e -> {
            confirmResult = ConfirmResult.NO;
            stage.close();
        });


        VBox layout = new VBox(10);
        layout.setAlignment(Pos.CENTER);
        layout.getChildren().addAll(label, buttonYes, buttonNo);

        stage.setScene(new Scene(layout, 250, 150));

        // UI Thread is going to wait till window/stage is closed
        stage.showAndWait();
        return confirmResult;
    }

    public enum ConfirmResult {
        YES, NO, NONE;
    }
}
