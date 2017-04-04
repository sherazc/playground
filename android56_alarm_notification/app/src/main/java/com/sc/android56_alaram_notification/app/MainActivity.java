package com.sc.android56_alaram_notification.app;

import android.app.AlarmManager;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.TimePicker;

import java.util.Calendar;

public class MainActivity extends ActionBarActivity {

    public static final String MESSAGE = "message";
    private EditText notificationMessageEditText;
    private TimePicker notificationTimePicker;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        notificationMessageEditText = (EditText) findViewById(R.id.notification_message_edit_text);
        notificationTimePicker = (TimePicker) findViewById(R.id.notification_time_picker);

        clearAllPreviousNotification();
    }

    private void clearAllPreviousNotification() {
        NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        notificationManager.cancelAll();
    }

    public void startService(View view){
        NotificationAlarm.createInstance(this)
                .notify(
                        notificationMessageEditText.getText().toString(),
                        notificationTimePicker.getCurrentHour(),
                        notificationTimePicker.getCurrentMinute()
                );
    }

    public void stopService(View view){
        NotificationAlarm.createInstance(this).cancelNotification();

    }
}
