package com.sc.javafx;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class JavaFx01 extends Application {

	public static void main(String[] args) {
		launch(args);
	}

	@Override
	public void start(Stage stage) throws Exception {
		stage.setTitle("JavaFx 01");
		final TextField textField = new TextField("Default Text Field");
		final Label lable = new Label();
		Button button = new Button("Change Label");

		button.setOnAction(new EventHandler<ActionEvent>() {
			@Override
			public void handle(ActionEvent actionEvent) {
				lable.setText(textField.getText());
			}
		});

		VBox root = new VBox();
		root.getChildren().addAll(textField, lable, button);
		Scene scene = new Scene(root, 500, 500);
		stage.setScene(scene);
		stage.show();
	}
}
