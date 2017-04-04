package com.sc.android02;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class Android02ActivitiesActivity extends Activity {
    /** Called when the activity is first created. */
    
	private Button button;
	@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        addListnerOnButton();
    }
    
    private void addListnerOnButton() {
    	final Context context = this;
    	button = (Button) findViewById(R.id.button1);
    	button.setOnClickListener(new OnClickListener() {
			
			public void onClick(View v) {
				Intent intent = new Intent(context, AppActivity02.class);
				startActivity(intent);
			}
		});
    }
}