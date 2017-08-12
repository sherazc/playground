package com.sc.rotd.app.service;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import com.sc.rotd.api.utils.CommonUtils;
import com.sc.rotd.app.SettingsActivity;
import com.sc.rotd.app.persistence.SharedPreferencesManager;

import java.util.Calendar;

public class NotificationAlarm {

    public static final int DEFAULT_REMINDER_HOURS = 7;
    public static final int DEFAULT_REMINDER_MINUTES = 0;

    private static NotificationAlarm notificationAlarm;

    private static final int ALARM_ID = 708060;

    private Context context;
    private SharedPreferencesManager sharedPreferencesManager;

    private NotificationAlarm() {
    }

    public static NotificationAlarm createInstance(Context context) {
        if (notificationAlarm == null) {
            notificationAlarm = new NotificationAlarm();
        }
        notificationAlarm.setContext(context);
        notificationAlarm.setSharedPreferencesManager(new SharedPreferencesManager(context));
        return notificationAlarm;
    }

    public void setupOrCancelNotificationAlarm() {

        String reminderSwitch = sharedPreferencesManager.findStringValue(SettingsActivity.REMINDER_SERVICE_SWITCH_KEY);
        if (CommonUtils.isBlank(reminderSwitch) || Boolean.parseBoolean(reminderSwitch)) {
            Calendar settingsCalendar = persistedReminderTime();

            Calendar today = Calendar.getInstance();
            today = CommonUtils.makeTimeCalendar(today.get(Calendar.HOUR_OF_DAY), today.get(Calendar.MINUTE));

            if (settingsCalendar.after(today)) {
                setupNotification(0);
            } else {
                setupNotification(1);
            }
        } else {
            cancelNotification();
        }
    }

    public void setupNotification(int remindInDays) {

        Calendar alarmTime = nextAlarmTime(remindInDays);

        Intent notificationAlarmServiceIntent = new Intent(context, NotificationAlarmService.class);
        PendingIntent notificationAlarmServicePendingIntent = PendingIntent.getService(context, ALARM_ID,
                notificationAlarmServiceIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        alarmManager.set(AlarmManager.RTC_WAKEUP, alarmTime.getTimeInMillis(), notificationAlarmServicePendingIntent);

    }


    private void cancelNotification() {

        Intent notificationAlarmServiceIntent = new Intent(context, NotificationAlarmService.class);
        PendingIntent notificationAlarmServicePendingIntent = PendingIntent.getService(context, ALARM_ID,
                notificationAlarmServiceIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        alarmManager.cancel(notificationAlarmServicePendingIntent);
    }

    public void setContext(Context context) {
        this.context = context;
    }

    private Calendar nextAlarmTime(int days) {
        Calendar result = persistedReminderTime();
        result.add(Calendar.DATE, days);
        return result;
    }

    public void setSharedPreferencesManager(SharedPreferencesManager sharedPreferencesManager) {
        this.sharedPreferencesManager = sharedPreferencesManager;
    }


    public static Calendar defaultReminderTime() {
        return CommonUtils.makeTimeCalendar(DEFAULT_REMINDER_HOURS, DEFAULT_REMINDER_MINUTES);
    }


    public Calendar persistedReminderTime() {
        Calendar result = NotificationAlarm.defaultReminderTime();
        long savedReminderTime = this.sharedPreferencesManager.findLongValue(
                SettingsActivity.SETTING_REMINDER_TIME_KEY);

        if (savedReminderTime > -1) {
            Calendar persistedTime = Calendar.getInstance();
            persistedTime.setTimeInMillis(savedReminderTime);
            result = CommonUtils.makeTimeCalendar(persistedTime.get(Calendar.HOUR_OF_DAY),
                    persistedTime.get(Calendar.MINUTE));
        }
        return result;
    }
}
