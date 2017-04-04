package com.sc.android02;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class AppActivity02 extends Activity {

	private Button button;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main2);
		addListnerOnButton();
	}
	
	private void addListnerOnButton() {
    	final Context context = this;
    	button = (Button) findViewById(R.id.button1);
    	button.setOnClickListener(new OnClickListener() {
			
			public void onClick(View v) {
				Intent intent = new Intent(context, Android02ActivitiesActivity.class);
				startActivity(intent);
			}
		});
    }
}
