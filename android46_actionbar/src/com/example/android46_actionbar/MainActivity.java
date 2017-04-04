package com.example.android46_actionbar;

import java.text.SimpleDateFormat;
import java.util.Date;

import android.app.ActionBar;
import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		Button buttonHideAb = (Button) findViewById(R.id.buttonHideAb);
		Button buttonShowAb = (Button) findViewById(R.id.buttonShowAb);
		final ActionBar actionBar = getActionBar();
		buttonHideAb.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				actionBar.hide();
			}
		});

		buttonShowAb.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				actionBar.show();
				SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
				SimpleDateFormat sdf2 = new SimpleDateFormat("S");
				Date date = new Date();
				actionBar.setTitle(sdf.format(date));
				actionBar.setSubtitle(sdf2.format(date));
			}
		});

		Button buttonHideSystemUi = (Button) findViewById(R.id.buttonHideSystemUi);
		Button buttonShowSystemUi = (Button) findViewById(R.id.buttonShowSystemUi);

		buttonHideSystemUi.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				getWindow().getDecorView().setSystemUiVisibility(
				View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
						|View.SYSTEM_UI_FLAG_IMMERSIVE
						|View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
						|View.SYSTEM_UI_FLAG_FULLSCREEN
						);

			}
		});

		buttonShowSystemUi.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
			}
		});
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {

		switch (item.getItemId()) {
		case R.id.action_refresh:
			Toast.makeText(this, "Refreshing...", Toast.LENGTH_SHORT).show();
			break;
		case R.id.action_settings:
			Toast.makeText(this, "Setting...", Toast.LENGTH_SHORT).show();
			break;
		case R.id.action_stop:
			Toast.makeText(this, "Stop", Toast.LENGTH_SHORT).show();
			break;
		}
		return true;
	}

}
