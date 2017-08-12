package com.sc.android52_services;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

/**
 * Created by SherazD on 1/14/2015.
 */
public class S01Activity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.service01);
    }

    public void startService01(View view) {
        startService(new Intent(this, S01Service.class));
    }

    public void stopService01(View view) {
        stopService(new Intent(this, S01Service.class));
    }
}