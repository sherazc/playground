package com.sc.android.android40_start_close_activity;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.Button;

public class Activity2 extends Activity implements OnClickListener {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		this.requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.activity2);
		
		Button buttonClose = (Button) findViewById(R.id.buttonCloseActivity2);
		buttonClose.setOnClickListener(this);
		Button buttonBackActivity = (Button) findViewById(R.id.buttonBackActivity);
		buttonBackActivity.setOnClickListener(this);
		
	}
	
	@Override
	public void onClick(View view) {
		if (view.getId() == R.id.buttonCloseActivity2) {
			Log.i("android40", "Close pressed");
			finish();
			moveTaskToBack(true);
			
		} else if (view.getId() == R.id.buttonBackActivity) {
			//finishActivity(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
			Log.i("android40", "Back pressed");
			onBackPressed();
			
		}
	}

}
