package com.sc.android53_toolbar.app;

import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.View;


public class MainActivity extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void toolbar01(View view) {
        startActivity(new Intent(this, Toolbar01.class));
    }

    public void toolbar02(View view) {
        startActivity(new Intent(this, Toolbar02.class));
    }

    public void toolbar03(View view) {
        startActivity(new Intent(this, Toolbar03.class));
    }
}
