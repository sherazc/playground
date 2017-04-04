package com.sc.android.listener;

import android.app.Activity;
import android.text.Editable;
import android.text.TextWatcher;

import com.sc.android.service.PriceEvaluator;

public class BillTextChangeListener implements TextWatcher {

	private PriceEvaluator priceEvaluator;

	public BillTextChangeListener(Activity activity) {
		priceEvaluator = new PriceEvaluator(activity);
	}

	@Override
	public void afterTextChanged(Editable s) {
	}

	@Override
	public void beforeTextChanged(CharSequence text, int start, int count, int after) {
	}

	@Override
	public void onTextChanged(CharSequence text, int start, int before, int count) {
		priceEvaluator.evaluate();
	}
}
