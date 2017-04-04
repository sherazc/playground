package com.sc.android50_anim_loading_screen.app;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.View;


public class MainActivity extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void a01CrossFadeViews(View view) {
        startActivity(new Intent(this, Activity01CrossFadeViews.class));
    }
}
