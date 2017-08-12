package com.sc.android51_notification;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends Activity {
    /**
     * Called when the activity is first created.
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
    }

    public void startNotification01(View view) {
        startActivity(new Intent(this, Notification01.class));
    }

    public void startNotification02(View view) {
        startActivity(new Intent(this, Notification02.class));
    }
}
