package com.sc.android10;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.TextView;
import android.widget.ToggleButton;

public class MainActivity extends Activity {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.main);
		printToggleText();
		addListenerOnButton();
	}

	private void addListenerOnButton() {
		ToggleButton toggleButton1 = (ToggleButton) findViewById(R.id.toggleButton1);
		ToggleButton toggleButton2 = (ToggleButton) findViewById(R.id.toggleButton2);
		addOnClickListener(toggleButton1);
		addOnClickListener(toggleButton2);

	}

	private void addOnClickListener(ToggleButton toggleButton) {
		toggleButton.setOnClickListener(new OnClickListener() {

			public void onClick(View v) {
				printToggleText();

			}
		});
	}

	private void printToggleText() {
		TextView textView = (TextView) findViewById(R.id.textView1);
		ToggleButton toggleButton1 = (ToggleButton) findViewById(R.id.toggleButton1);
		ToggleButton toggleButton2 = (ToggleButton) findViewById(R.id.toggleButton2);

		StringBuffer result = new StringBuffer();
		result.append("Toggle Button 1: " + toggleButton1.getText());
		result.append("\nToggle Button 2: " + toggleButton2.getText());

		textView.setText(result);
	}
}