package com.sc.android;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.widget.EditText;
import android.widget.SeekBar;
import android.widget.TextView;

import com.sc.android.listener.BillTextChangeListener;
import com.sc.android.listener.TipSeekBarChangeListener;

public class MainActivity extends Activity {

	private static final String SAVED_STATE_BILL = "SAVED_STATE_BILL";
	private static final String SAVED_STATE_TIP = "SAVED_STATE_TIP";
	private static final String SAVED_STATE_FINAL_BILL = "SAVED_STATE_FINAL_BILL";

	private EditText textBill;
	private EditText textTip;
	private TextView textFinalBill;
	private BillTextChangeListener billTextChangeListener;
	private SeekBar seekBarTip;

	private double billBeforeTip;
	private int tipAmount;
	private double finalBill;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		textBill = (EditText) findViewById(R.id.mainFieldBill);
		textTip = (EditText) findViewById(R.id.mainFieldTip);
		textFinalBill = (TextView) findViewById(R.id.mainTextFinalBill);
		seekBarTip = (SeekBar) findViewById(R.id.mainSeekTip);

		billTextChangeListener = new BillTextChangeListener(this);
		textBill.addTextChangedListener(billTextChangeListener);
		textTip.addTextChangedListener(billTextChangeListener);

		seekBarTip.setOnSeekBarChangeListener(new TipSeekBarChangeListener(this));

		if (savedInstanceState == null) {
			billBeforeTip = 0.0;
			tipAmount = 15;
			finalBill = 0.0;
		} else {
			billBeforeTip = savedInstanceState.getDouble(SAVED_STATE_BILL);
			tipAmount = savedInstanceState.getInt(SAVED_STATE_TIP);
			finalBill = savedInstanceState.getDouble(SAVED_STATE_FINAL_BILL);
		}
		textBill.setText("" + billBeforeTip);
		textTip.setText("" + tipAmount);
		textFinalBill.setText(String.format("%.2f", finalBill));
		seekBarTip.setProgress(tipAmount);
	}

	@Override
	protected void onSaveInstanceState(Bundle outState) {
		super.onSaveInstanceState(outState);
		outState.putDouble(SAVED_STATE_BILL, billBeforeTip);
		outState.putInt(SAVED_STATE_TIP, tipAmount);
		outState.putDouble(SAVED_STATE_FINAL_BILL, finalBill);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
