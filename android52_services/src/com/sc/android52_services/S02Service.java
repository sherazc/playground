package com.sc.android52_services;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.IBinder;
import android.widget.Toast;

import java.util.Date;

/**
 * Created by SherazD on 1/14/2015.
 */
public class S02Service extends Service {
    private NotificationThread notificationThread;

    public S02Service() {
        notificationThread = new NotificationThread(this);
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Toast.makeText(this, "Service 02 started " + new Date(), Toast.LENGTH_SHORT).show();
        notificationThread.start();
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        Toast.makeText(this, "Service 02 started " + new Date(), Toast.LENGTH_SHORT).show();
        notificationThread.stopNotification();
    }


    private class NotificationThread extends Thread {
        private Context context;
        private boolean runningFlag;

        public NotificationThread(Context context) {
            this.context = context;
            runningFlag = true;
        }

        @Override
        public void run() {
            while (runningFlag) {
                createNotification();
                try {
                    Thread.sleep(5000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }

        public void stopNotification() {
            runningFlag = false;
        }

        public void createNotification() {
            Notification.Builder builder = new Notification.Builder(context);
            builder.setAutoCancel(true);
            builder.setSmallIcon(R.drawable.ic_launcher);
            builder.setContentTitle("Service Notification");
            builder.setContentText(new Date() + " Today's date and time.");

            PendingIntent notifyPIntent =
                    PendingIntent.getActivity(getApplicationContext(), 0, new Intent(context, S02Activity.class), 0);
            builder.setContentIntent(notifyPIntent);

            Notification notification = builder.build();

            NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
            notificationManager.notify(100, notification);
        }
    }
}
