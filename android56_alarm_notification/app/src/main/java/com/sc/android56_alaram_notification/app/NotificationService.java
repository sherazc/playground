package com.sc.android56_alaram_notification.app;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.support.v4.app.NotificationCompat;
import android.widget.Toast;

import java.util.Date;

public class NotificationService extends Service {

    private String veryLongText = "When you install Polymer using Bower or the ZIP file, you get the Web Components " +
            "polyfill library. Using the polyfills ensures that you can use Polymer with browsers that don’t support " +
            "the Web Components specifications natively";

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Toast.makeText(this, "onStartCommand()", Toast.LENGTH_SHORT).show();
        String message = intent.getStringExtra(MainActivity.MESSAGE);

        NotificationCompat.BigTextStyle style = new NotificationCompat.BigTextStyle();
        style.setBigContentTitle(message);
        style.bigText(new Date() + " " + veryLongText);

        sendStyleNotification(style, 100);

        return Service.START_NOT_STICKY;
    }

    @Override
    public void onDestroy() {
        Toast.makeText(this, "onDestroy()", Toast.LENGTH_SHORT).show();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }


    private void sendStyleNotification(NotificationCompat.Style style, int notificationId) {

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this);
        builder.setAutoCancel(true);
        builder.setContentText(veryLongText);
        builder.setContentTitle("This is Title");
        builder.setSmallIcon(R.drawable.ic_launcher);

        PendingIntent notifyPIntent =
                PendingIntent.getActivity(getApplicationContext(), 0, new Intent(this, MainActivity.class), 0);
        builder.setContentIntent(notifyPIntent);

        builder.setStyle(style);

        Notification notification = builder.build();
        NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        notificationManager.notify(notificationId, notification);

    }
}
