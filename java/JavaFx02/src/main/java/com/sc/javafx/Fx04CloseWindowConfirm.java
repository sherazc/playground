package com.sc.javafx;

import com.sc.javafx.common.ConfirmDialog;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

public class Fx04CloseWindowConfirm extends Application {

    private Stage window;

    @Override
    public void start(Stage primaryStage) throws Exception {
        this.window = primaryStage;
        window.setTitle("Fx04CloseWindowConfirm");
        window.setOnCloseRequest(e -> {
            // consume method invalidates event.
            e.consume();
            closeApp();
        });

        Button buttonClose = new Button("Close");
        buttonClose.setOnAction(event -> closeApp());

        StackPane layout = new StackPane();
        layout.getChildren().addAll(buttonClose);
        window.setScene(new Scene(layout, 300, 300));
        window.show();
    }

    private void closeApp() {
        ConfirmDialog.ConfirmResult confirm = ConfirmDialog.display("Close Application", "Are You sure you want to close?");
        if (ConfirmDialog.ConfirmResult.YES == confirm) {
            System.out.println("Doing addition closing processing...");
            window.close();
        }
    }

    public static void main(String[] args) {
        launch();
    }
}
