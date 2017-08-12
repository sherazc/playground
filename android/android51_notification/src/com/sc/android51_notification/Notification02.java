package com.sc.android51_notification;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;
import android.view.View;

import java.util.Date;

/**
 * Created by SherazD on 1/13/2015.
 */
public class Notification02 extends Activity {

    private String veryLongText = "When you install Polymer using Bower or the ZIP file, you get the Web Components " +
            "polyfill library. Using the polyfills ensures that you can use Polymer with browsers that don’t support " +
            "the Web Components specifications natively";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.notification02);
    }

    public void notificationBigText(View view) {

        NotificationCompat.BigTextStyle style = new NotificationCompat.BigTextStyle();
        style.setBigContentTitle("Big Text Title");
        style.bigText(new Date() + " " + veryLongText);

        sendStyleNotification(style, 100);
    }

    public void notificationBigPicture(View view) {
        NotificationCompat.BigPictureStyle style = new NotificationCompat.BigPictureStyle();
        style.setSummaryText("Big Picture Summary Text");
        style.setBigContentTitle("Big Picture Content Title");

        Bitmap bitmapLargeIcon = BitmapFactory.decodeResource(getResources(), R.drawable.image2);
        style.bigLargeIcon(bitmapLargeIcon);

        Bitmap bigPicture = BitmapFactory.decodeResource(getResources(), R.drawable.image3);
        style.bigPicture(bigPicture);

        sendStyleNotification(style, 200);
    }

    public void notificationInbox(View view) {
        NotificationCompat.InboxStyle style = new NotificationCompat.InboxStyle();

        style.setBigContentTitle("Inbox Big Content Tile");
        style.addLine("Line 1");
        style.addLine("Line 2");
        style.addLine("Line 3");
        style.setSummaryText("Inbox Summary Text");
        sendStyleNotification(style, 300);
    }

    private void sendStyleNotification(NotificationCompat.Style style, int notificationId) {

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this);
        builder.setAutoCancel(true);
        builder.setContentText(veryLongText);
        builder.setContentTitle("This is Title");
        builder.setSmallIcon(R.drawable.image1);

        PendingIntent notifyPIntent =
                PendingIntent.getActivity(getApplicationContext(), 0, new Intent(this, Notification02.class), 0);
        builder.setContentIntent(notifyPIntent);

        builder.setStyle(style);

        Notification notification = builder.build();
        NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        notificationManager.notify(notificationId, notification);

    }

}
