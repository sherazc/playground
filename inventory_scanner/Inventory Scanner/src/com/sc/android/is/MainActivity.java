package com.sc.android.is;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Window;
import android.webkit.WebView;
import android.widget.TextView;

public class MainActivity extends Activity {
	/** Called when the activity is first created. */
	// http://tekeye.biz/2012/scan-barcode-from-android-app
	// http://damianflannery.wordpress.com/2011/06/13/integrate-zxing-barcode-scanner-into-your-android-app-natively-using-eclipse/
	// http://code.google.com/p/zxing/source/checkout
	// http://code.google.com/p/zxing/

	private ProductHandler productHandler = new ProductHandler(this);

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.main);
		HandleOnClickEvent event = new HandleOnClickEvent(this);
		findViewById(R.id.buttonScan).setOnClickListener(event);

	}

	protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
		if (requestCode == 0) {
			TextView tvStatus = (TextView) findViewById(R.id.tvStatus);
			WebView view = (WebView) findViewById(R.id.productDetail);
			if (resultCode == RESULT_OK) {
				String scanResult = intent.getStringExtra("SCAN_RESULT");
				tvStatus.setText(scanResult);
				productHandler.fillProductView(scanResult, view);
			}
			if (resultCode == RESULT_CANCELED) {
				tvStatus.setText("Press Scan button to start.");
			}
		}
	}

}