package com.sc.md5;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.Pane;
import javafx.scene.layout.VBox;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.util.logging.Level;
import java.util.logging.Logger;

public final class App extends Application {

    @Override
    public void start(final Stage stage) {
        stage.setTitle("MD5 Generator");

        final FileChooser fileChooser = new FileChooser();
        final Button openButton = new Button("Open");
        final TextField md5Label = new TextField();
        md5Label.setPrefWidth(400);


        openButton.setOnAction(
                new EventHandler<ActionEvent>() {
                    @Override
                    public void handle(final ActionEvent e) {
                        configureFileChooser(fileChooser);
                        File file = fileChooser.showOpenDialog(stage);
                        if (file != null) {
                            openFile(file, md5Label);
                        }
                    }
                });


        final GridPane inputGridPane = new GridPane();

        GridPane.setConstraints(openButton, 1, 1);
        GridPane.setConstraints(md5Label, 0, 1);
        inputGridPane.setHgap(6);
        inputGridPane.setVgap(6);
        inputGridPane.getChildren().addAll(openButton, md5Label);

        final Pane rootGroup = new VBox(12);
        rootGroup.getChildren().addAll(inputGridPane);
        rootGroup.setPadding(new Insets(12, 12, 12, 12));

        stage.setScene(new Scene(rootGroup));
        stage.show();
    }

    public static void main(String[] args) {
        Application.launch(args);
    }

    private static void configureFileChooser(
            final FileChooser fileChooser) {
        fileChooser.setTitle("Choose file - MD5 Generator");
        fileChooser.setInitialDirectory(
                new File(System.getProperty("user.home"))
        );
        fileChooser.getExtensionFilters().removeAll(fileChooser.getExtensionFilters());
        fileChooser.getExtensionFilters().addAll(
                new FileChooser.ExtensionFilter("All Files", "*.*"),
                new FileChooser.ExtensionFilter("WAR", "*.war"),
                new FileChooser.ExtensionFilter("JAR", "*.jar"),
                new FileChooser.ExtensionFilter("CSV", "*.csv")
        );
    }

    private void openFile(File file, TextField md5Label) {
        try {
            byte[] buffer = new byte[8192];
            MessageDigest md = MessageDigest.getInstance("MD5");
            try (InputStream is = Files.newInputStream(Paths.get(file.toURI()));
                 DigestInputStream dis = new DigestInputStream(is, md))
            {
                try {
                    while (dis.read(buffer) != -1);
                }finally{
                    dis.close();
                }
            }
            byte[] digest = md.digest();
            StringBuilder sb = new StringBuilder();
            for (byte b: digest) {
                sb.append(String.format("%02X", b));
            }
            String checkSum = sb.toString();

            md5Label.setText(checkSum);
        } catch (Exception ex) {
            Logger.getLogger(App.class.getName()).log(
                    Level.SEVERE, null, ex
            );
        }
    }
}
