package com.sc.android.barcode;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

public class MainActivity extends Activity {
    /** Called when the activity is first created. */
	// http://tekeye.biz/2012/scan-barcode-from-android-app
	// http://damianflannery.wordpress.com/2011/06/13/integrate-zxing-barcode-scanner-into-your-android-app-natively-using-eclipse/
	// http://code.google.com/p/zxing/source/checkout
	// http://code.google.com/p/zxing/
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
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