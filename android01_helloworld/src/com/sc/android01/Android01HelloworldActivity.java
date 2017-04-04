package com.sc.android01;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;

public class Android01HelloworldActivity extends Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        TextView text = new TextView(this);
        text.setText("Hello World 123");
        
        setContentView(text);
    }
}