package com.sc.android.listener;

import android.app.Activity;
import android.widget.EditText;
import android.widget.SeekBar;
import android.widget.SeekBar.OnSeekBarChangeListener;

import com.sc.android.R;
import com.sc.android.service.PriceEvaluator;

public class TipSeekBarChangeListener implements OnSeekBarChangeListener {

	private Activity activity;
	private PriceEvaluator priceEvaluator;
	private boolean seekBarChangingValue;

	public TipSeekBarChangeListener(Activity activity) {
		this.activity = activity;
		priceEvaluator = new PriceEvaluator(activity);
	}

	@Override
	public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
		// doing this seekBarChangingValue check because when tip text is maually changed it triggers 
		// this method onProgressChanged() and this sets value again in tip text which miss places 
		// cursor in tip text field.
		if (seekBarChangingValue) {
			EditText textTip = (EditText) activity.findViewById(R.id.mainFieldTip);
			textTip.setText("" + seekBar.getProgress());	
			priceEvaluator.evaluate();
		}
	}

	@Override
	public void onStartTrackingTouch(SeekBar seekBar) {
		seekBarChangingValue = true;
	}

	@Override
	public void onStopTrackingTouch(SeekBar seekBar) {
		seekBarChangingValue = false;
	}
}
