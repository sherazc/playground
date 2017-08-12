package com.sc.javafx;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.stage.Modality;
import javafx.stage.Stage;

public class Fx03WindowsCommunication extends Application {
    @Override
    public void start(Stage primaryStage) throws Exception {

        Label confirmStatus = new Label();
        Button button = new Button("Alert Me");
        button.setOnAction(e -> {
            Fx03ConfirmType confirmType = Fx03ConfirmBox.display("My Alert Box", "My Alert box Message.");

            switch (confirmType) {
                case YES:
                    confirmStatus.setText("Yes Clicked");
                    break;
                case NO:
                    confirmStatus.setText("No Clicked");
                    break;
                case CANCEL:
                    confirmStatus.setText("Cancel Clicked");
                    break;
                case NONE:
                    confirmStatus.setText("None Clicked");
                    break;
                default:
                    confirmStatus.setText("Not sure what happened.");
                    break;
            }
        });

        VBox layout = new VBox(10);
        layout.getChildren().addAll(button, confirmStatus);
        Scene scene = new Scene(layout, 200, 200);

        primaryStage.setScene(scene);
        primaryStage.setTitle("Fx03");
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch();
    }
}

class Fx03ConfirmBox {
    private static Fx03ConfirmType result = Fx03ConfirmType.NONE;

    private Fx03ConfirmBox() {
    }

    public static Fx03ConfirmType display(String title, String message) {
        Stage stage = new Stage();
        stage.initModality(Modality.APPLICATION_MODAL);

        stage.setTitle(title);

        Label label = new Label(message);

        Button buttonYes = new Button("Yes");
        Button buttonNo = new Button("No");
        Button buttonCancel = new Button("Cancel");

        buttonYes.setOnAction(e -> {
            result = Fx03ConfirmType.YES;
            stage.close();
        });

        buttonNo.setOnAction(e -> {
            result = Fx03ConfirmType.NO;
            stage.close();
        });

        buttonCancel.setOnAction(e -> {
            result = Fx03ConfirmType.CANCEL;
            stage.close();
        });

        VBox layout = new VBox(10);
        layout.setAlignment(Pos.CENTER);
        layout.getChildren().addAll(label, buttonYes, buttonNo, buttonCancel);

        stage.setScene(new Scene(layout, 150, 150));

        // UI Thread is going to wait till window/stage is closed
        stage.showAndWait();
        return result;
    }
}

enum Fx03ConfirmType {
    YES, NO, CANCEL, NONE;
}
