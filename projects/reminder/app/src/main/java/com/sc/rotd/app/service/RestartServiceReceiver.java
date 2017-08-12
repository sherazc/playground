package com.sc.rotd.app.service;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/**
 * Created by chaush01 on 2/12/2015.
 */
public class RestartServiceReceiver extends BroadcastReceiver {

    public static final String RESTART_SERVICE_BROADCAST_TAG = "quran_reminder_restart_broadcast";

    @Override
    public void onReceive(Context context, Intent intent) {
        NotificationAlarm.createInstance(context).setupOrCancelNotificationAlarm();
    }
}
