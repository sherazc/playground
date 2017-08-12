package com.sc.android09;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

public class MainActivity extends Activity {
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.main);
		addListenerOnButtons();
	}

	private void addListenerOnButtons() {
		Button buttonEquals = (Button) findViewById(R.id.buttonEquals);
		buttonEquals.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {
				try {
					RadioGroup operatorGroup = (RadioGroup) findViewById(R.id.operatorGroup);
					EditText num1EditText = (EditText) findViewById(R.id.num1);
					EditText num2EditText = (EditText) findViewById(R.id.num2);
					EditText numResultEditText = (EditText) findViewById(R.id.numResult);

					int operatorSelectedId = operatorGroup.getCheckedRadioButtonId();

					RadioButton operatorSelected = (RadioButton) findViewById(operatorSelectedId);
					int result = 0;
					if ("+".equals(operatorSelected.getText().toString())) {
						result = Integer.parseInt(num1EditText.getText().toString())
								+ Integer.parseInt(num2EditText.getText().toString());
					} else if ("-".equals(operatorSelected.getText().toString())) {
						result = Integer.parseInt(num1EditText.getText().toString())
								- Integer.parseInt(num2EditText.getText().toString());
					} else if ("/".equals(operatorSelected.getText().toString())) {
						result = Integer.parseInt(num1EditText.getText().toString())
								/ Integer.parseInt(num2EditText.getText().toString());
					} else if ("*".equals(operatorSelected.getText().toString())) {
						result = Integer.parseInt(num1EditText.getText().toString())
								* Integer.parseInt(num2EditText.getText().toString());
					}
					numResultEditText.setText("" + result);

				} catch (Exception e) {
					Toast.makeText(MainActivity.this, "Fix your numbers", Toast.LENGTH_SHORT).show();
				}
			}
		});

	}
}