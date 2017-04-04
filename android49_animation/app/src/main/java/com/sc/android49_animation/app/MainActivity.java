package com.sc.android49_animation.app;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.View;
import android.widget.CheckBox;

// https://www.youtube.com/watch?v=_UWXqFBF86U
public class MainActivity extends ActionBarActivity {

    private CheckBox cbUseAmiResource;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void activityAnimation01(View view) {
        startActivity(new Intent(this, Animation01.class));
    }

    public void activityAnimation02(View view) {
        startActivity(new Intent(this, Animation02.class));
    }
}
