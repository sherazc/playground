package com.sc.android03;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends Activity {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		addListners();
	}

	private void addListners() {
		Button button01 = (Button) findViewById(R.id.button01);
		Button button02 = (Button) findViewById(R.id.button02);
		Button button03 = (Button) findViewById(R.id.button03);
		TextView text01 = (TextView) findViewById(R.id.text01);

		addButtonListner(button01, text01);
		addButtonListner(button02, text01);
		addButtonListner(button03, text01);
	}

	private void addButtonListner(final Button button, final TextView textView) {
		button.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {
				textView.setText(button.getText() + " clicked!");
			}
		});
	}

}