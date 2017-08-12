package com.sc.android.service;

import com.sc.android.R;
import com.sc.android.listener.BillTextChangeListener;
import com.sc.android.util.NumberUtil;

import android.app.Activity;
import android.util.Log;
import android.widget.EditText;
import android.widget.SeekBar;
import android.widget.TextView;

public class PriceEvaluator {

	private Activity activity;
	
	public PriceEvaluator(Activity activity) {
		this.activity = activity;
	}
	
	public void evaluate() {
		try {
			EditText tipText = (EditText) activity.findViewById(R.id.mainFieldTip);
			EditText priceText = (EditText) activity.findViewById(R.id.mainFieldBill);
			TextView finalBillText = (TextView) activity.findViewById(R.id.mainTextFinalBill);
			SeekBar seekTip = (SeekBar) activity.findViewById(R.id.mainSeekTip);
			int tip = NumberUtil.stringToInt(tipText.getText());
			seekTip.setProgress(tip);
			double price = NumberUtil.stringToDouble(priceText.getText());
			double finalBill = price + (price * ((double) tip / 100));
			
			finalBillText.setText(String.format("%.2f", finalBill));
		} catch (Exception e) {
			Log.e(BillTextChangeListener.class.getName(), e.getMessage());
		}
	}	
}
