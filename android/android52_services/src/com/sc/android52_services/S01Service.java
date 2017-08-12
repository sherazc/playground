package com.sc.android52_services;

import android.app.Service;
import android.content.ComponentName;
import android.content.Intent;
import android.os.IBinder;
import android.widget.Toast;

import java.util.Date;

/**
 * Created by SherazD on 1/14/2015.
 */
public class S01Service extends Service {

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        Toast.makeText(this, "Service 01 started " + new Date(), Toast.LENGTH_SHORT).show();
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        Toast.makeText(this, "Service 01 stopped " + new Date(), Toast.LENGTH_SHORT).show();
    }
}
