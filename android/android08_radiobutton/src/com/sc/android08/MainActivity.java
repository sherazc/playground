package com.sc.android08;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

public class MainActivity extends Activity {
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		addListenerOnButton();
	}

	private void addListenerOnButton() {
		final RadioGroup radioSexGroup = (RadioGroup) findViewById(R.id.radioSex);
		Button buttonDisplay = (Button) findViewById(R.id.btnDisplay);

		buttonDisplay.setOnClickListener(new OnClickListener() {

			public void onClick(View v) {
				int selectedId = radioSexGroup.getCheckedRadioButtonId();
				RadioButton radioSexButton = (RadioButton) findViewById(selectedId);

				Toast.makeText(MainActivity.this, radioSexButton.getText(), Toast.LENGTH_SHORT).show();

			}
		});

	}
}