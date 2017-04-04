package com.sc.android52_services;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

/**
 * Created by SherazD on 1/14/2015.
 */
public class S02Activity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.service02);
    }

    public void startService02(View view) {
        startService(new Intent(this, S02Service.class));
    }

    public void stopService02(View view) {
        stopService(new Intent(this, S02Service.class));
    }
}