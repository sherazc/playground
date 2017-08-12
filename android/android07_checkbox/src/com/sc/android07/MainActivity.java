package com.sc.android07;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.Toast;

public class MainActivity extends Activity {

	private CheckBox chkIos, chkAndroid, chkWindows;
	private Button btnDisplay;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		addListenerOnChkIos();
		addListenerOnButton();
	}

	private void addListenerOnChkIos() {
		chkIos = (CheckBox) findViewById(R.id.chkIos);
		chkIos.setOnClickListener(new OnClickListener() {

			public void onClick(View v) {
				if (((CheckBox) v).isChecked()) {
					Toast.makeText(MainActivity.this, "Looser!!!", Toast.LENGTH_SHORT).show();
				}
			}
		});
	}

	private void addListenerOnButton() {
		chkIos = (CheckBox) findViewById(R.id.chkIos);
		chkAndroid = (CheckBox) findViewById(R.id.chkAndroid);
		chkWindows = (CheckBox) findViewById(R.id.chkWindows);

		btnDisplay = (Button) findViewById(R.id.btnDisplay);

		btnDisplay.setOnClickListener(new OnClickListener() {

			public void onClick(View v) {
				StringBuffer result = new StringBuffer();
				result.append("iPhone: ").append(chkIos.isChecked());
				result.append("\nAndroid: ").append(chkAndroid.isChecked());
				result.append("\nWindows: ").append(chkWindows.isChecked());

				Toast.makeText(MainActivity.this, result, Toast.LENGTH_SHORT).show();
			}
		});

	}
}