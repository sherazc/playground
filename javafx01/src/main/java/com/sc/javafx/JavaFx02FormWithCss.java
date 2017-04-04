package com.sc.javafx;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.text.Text;
import javafx.stage.Stage;

public class JavaFx02FormWithCss extends Application {

	public static void main(String[] args) {
		launch(args);
	}

	@Override
	public void start(Stage primaryStage) throws Exception {
		primaryStage.setTitle("JavaFx02FormWithCss");
		primaryStage.getIcons().add(new Image(JavaFx02FormWithCss.class.getResource("/icon.png").toExternalForm()));
		primaryStage.setResizable(false);

		GridPane grid = new GridPane();

		grid.setAlignment(Pos.CENTER);
		grid.setHgap(10);
		grid.setVgap(10);
		grid.setPadding(new Insets(25, 25, 25, 25));

		Text sceneTitle = new Text("Welcome");
		sceneTitle.setId("welcome-text");
		grid.add(sceneTitle, 0, 0, 2, 1);
		
		Label userName = new Label("User Name:");
		grid.add(userName, 0,  1);
		
		TextField userTextField = new TextField();
		grid.add(userTextField, 1, 1);
		
		Label password = new Label("Password:");
		grid.add(password, 0, 2);
		
		PasswordField passwordField = new PasswordField();
		grid.add(passwordField, 1, 2);
		
		//http://docs.oracle.com/javafx/2/get_started/LoginCSS.java.html
		
		Button button = new Button("Sign in");
		HBox hbButton = new HBox(10);
		hbButton.setAlignment(Pos.BOTTOM_RIGHT);
		hbButton.getChildren().add(button);
		grid.add(hbButton, 1, 4);
		
		final Text actionTarget = new Text();
		grid.add(actionTarget, 1,  6);
		actionTarget.setId("actiontarget");

		
		button.setOnAction(new EventHandler<ActionEvent>() {
			
			@Override
			public void handle(ActionEvent actionEvent) {
				actionTarget.setText("Sign in button pressed");
			}
		});
		
		Scene scene = new Scene(grid, 400, 275);
		// all CSS is applied from the css below
		scene.getStylesheets().add(JavaFx02FormWithCss.class.getResource("/JavaFx02FormWithCss.css").toExternalForm());
		primaryStage.setScene(scene);
		primaryStage.show();
	}

}
