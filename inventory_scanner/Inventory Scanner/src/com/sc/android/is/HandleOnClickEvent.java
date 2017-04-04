package com.sc.android.is;

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
		if (R.id.buttonScan == v.getId()) {
			intent.putExtra("SCAN_FORMATS", "PRODUCT_MODECODE_39,CODE_93,CODE_128,DATA_MATRIX,ITF,CODABAR");
		}
		activity.startActivityForResult(intent, 0);
	}

}
