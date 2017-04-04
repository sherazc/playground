package com.sc.android.zxing;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

public class MainActivity extends Activity {
	// http://tekeye.biz/2012/scan-barcode-from-android-app
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main_activity);
		HandleOnClickEvent event = new HandleOnClickEvent(this);
		findViewById(R.id.butQR).setOnClickListener(event);
		findViewById(R.id.butProd).setOnClickListener(event);
		findViewById(R.id.butOther).setOnClickListener(event);
		

	}

	protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
		if (requestCode == 0) {
			TextView tvStatus = (TextView) findViewById(R.id.tvStatus);
			TextView tvResult = (TextView) findViewById(R.id.tvResult);
			
			if (resultCode == RESULT_OK) {
				tvStatus.setText(intent.getStringExtra("SCAN_RESULT_FORMAT"));
				tvResult.setText(intent.getStringExtra("SCAN_RESULT"));
			}
			
			if (resultCode == RESULT_CANCELED) {
				tvStatus.setText("Press a button to start a scan.");
				tvResult.setText("Scan Cancled");
			}

		}
	}

}
