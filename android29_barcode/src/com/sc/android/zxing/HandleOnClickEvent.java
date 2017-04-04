package com.sc.android.zxing;

import android.app.Activity;
import android.content.Intent;
import android.view.View;
import android.view.View.OnClickListener;

public class HandleOnClickEvent implements OnClickListener {

	private Activity activity;

	public HandleOnClickEvent(Activity activity) {
		this.activity = activity;
	}

	public void onClick(View v) {
		Intent intent = new Intent("com.google.zxing.client.android.SCAN");
		switch (v.getId()) {
		case R.id.butQR:
			intent.putExtra("SCAN_MODE", "QR_CODE_MODE");
			break;
		case R.id.butProd:
			intent.putExtra("SCAN_MODE", "PRODUCT_MODE");
			break;
		case R.id.butOther:
			intent.putExtra("SCAN_FORMATS", "CODE_39,CODE_93,CODE_128,DATA_MATRIX,ITF,CODABAR");
			break;
		}

		activity.startActivityForResult(intent, 0);
	}

}
