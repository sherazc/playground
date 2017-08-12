package com.sc.android56_alaram_notification.app;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;

import java.util.Calendar;

public class NotificationAlarm {

    private static NotificationAlarm notificationAlarm;
    private static final int ALARM_ID = 586;

    private Context context;

    private NotificationAlarm() {
    }

    public static NotificationAlarm createInstance(Context context) {
        if (notificationAlarm == null) {
            notificationAlarm = new NotificationAlarm();
        }
        notificationAlarm.setContext(context);
        return notificationAlarm;
    }

    public void notify(String message, int hours, int minutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, hours);
        calendar.set(Calendar.MINUTE, minutes);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.add(Calendar.DATE, 1);

        Intent notificationServiceIntent = new Intent(context, NotificationService.class);
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

        notificationServiceIntent.putExtra(MainActivity.MESSAGE, message);

        PendingIntent pendingNotificationServiceIntent = PendingIntent.getService(context, ALARM_ID, notificationServiceIntent,
                PendingIntent.FLAG_UPDATE_CURRENT);

        alarmManager.set(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), pendingNotificationServiceIntent);
    }


    public void setContext(Context context) {
        this.context = context;
    }

    public void cancelNotification(){
        Intent notificationServiceIntent = new Intent(context, NotificationService.class);
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

        PendingIntent pendingNotificationServiceIntent = PendingIntent.getService(context, ALARM_ID,
                notificationServiceIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        alarmManager.cancel(pendingNotificationServiceIntent);

    }
}
