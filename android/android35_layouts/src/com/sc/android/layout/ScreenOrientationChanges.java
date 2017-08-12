package com.sc.android.layout;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

public class ScreenOrientationChanges extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		Log.w("StateInfo", "onCreate");
		setContentView(R.layout.screen_orientation_changes);
	}

	@Override
	public void onStart() {
		Log.w("StateInfo", "onStart");
		super.onStart();
	}

	@Override
	public void onResume() {
		Log.w("StateInfo", "onResume");
		super.onResume();
	}

	@Override
	public void onPause() {
		Log.w("StateInfo", "onPause");
		super.onPause();
	}

	@Override
	public void onStop() {
		Log.w("StateInfo", "onStop");
		super.onStop();
	}

	@Override
	protected void onDestroy() {
		Log.w("StateInfo", "onDestroy");
		super.onDestroy();
	}

	@Override
	public void onRestart() {
		Log.w("StateInfo", "onRestart");
		super.onRestart();
	}
}
