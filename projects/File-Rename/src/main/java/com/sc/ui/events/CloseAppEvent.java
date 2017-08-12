package com.sc.ui.events;

import com.sc.ui.common.ConfirmDialog;
import javafx.event.EventHandler;
import javafx.stage.Stage;
import javafx.stage.WindowEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CloseAppEvent implements EventHandler<WindowEvent> {

    private static final Logger LOG = LoggerFactory.getLogger(CloseAppEvent.class);

    private Stage window;
    public CloseAppEvent(Stage window) {
        this.window = window;
    }

    @Override
    public void handle(WindowEvent event) {
        event.consume();
        ConfirmDialog.ConfirmResult confirm = ConfirmDialog.display("Close Application", "Are You sure you want to close?");
        if (ConfirmDialog.ConfirmResult.YES == confirm) {
            LOG.debug("Closing application");
            window.close();
        }
    }
}
