package com.sc.android52_services;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
    }

    public void startService01Activity(View view) {
        startActivity(new Intent(this, S01Activity.class));
    }

    public void startService02Activity(View view) {
        startActivity(new Intent(this, S02Activity.class));
    }
}
