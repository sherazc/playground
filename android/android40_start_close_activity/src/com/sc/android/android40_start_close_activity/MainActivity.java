package com.sc.android.android40_start_close_activity;

import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.Button;

public class MainActivity extends Activity implements OnClickListener {

	private Button buttonNextActivity;
	private Button buttonCloseActivity;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		this.requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.main);
		buttonNextActivity = (Button) findViewById(R.id.buttonNextActivity);
		buttonCloseActivity = (Button) findViewById(R.id.buttonCloseActivity);
		buttonNextActivity.setOnClickListener(this);
		buttonCloseActivity.setOnClickListener(this);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	@Override
	public void onClick(View v) {
		if (v.getId() == R.id.buttonNextActivity) {
			Intent intent = new Intent(this, Activity2.class);
			startActivity(intent);
		} else if (v.getId() == R.id.buttonCloseActivity) {
			finish();
		}
	}

}
