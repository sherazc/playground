package com.sc.android51_notification;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;
import android.view.View;

public class Notification01 extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.notification01);
    }

    public void createSimpleNotification(View view) {
        Notification.Builder notificationBuilder = new Notification.Builder(this);
        notificationBuilder.setAutoCancel(true);
        notificationBuilder.setSmallIcon(R.drawable.azureus);
        notificationBuilder.setContentTitle("Notification");
        notificationBuilder.setContentText("This notification is created using Android 4 classes");

        PendingIntent notifyPIntent =
                PendingIntent.getActivity(getApplicationContext(), 0, new Intent(this, Notification01.class), 0);
        notificationBuilder.setContentIntent(notifyPIntent);

        NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        Notification notification = notificationBuilder.build();
        notification.flags = Notification.DEFAULT_LIGHTS | Notification.FLAG_AUTO_CANCEL;
        notificationManager.notify(200, notification);
    }

    public void createSimpleCompatNotification(View view) {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this);
        builder.setAutoCancel(true);
        builder.setSmallIcon(R.drawable.image4);
        builder.setContentTitle("Compat Notification");
        builder.setContentText("Built using notification compat.");

        PendingIntent notifyPIntent =
                PendingIntent.getActivity(getApplicationContext(), 0, new Intent(this, Notification01.class), 0);
        builder.setContentIntent(notifyPIntent);

        NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        Notification notification = builder.build();
        notification.flags = Notification.DEFAULT_LIGHTS | Notification.FLAG_AUTO_CANCEL;
        notificationManager.notify(100, notification);
    }

}