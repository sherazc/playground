package com.sc.android17;

import android.app.Activity;
import android.os.Bundle;
import android.widget.Button;

public class MainActivity extends Activity {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		setContentView(R.layout.main);
		Button button = (Button) findViewById(R.id.buttonAlert);
		button.setOnClickListener(new AlertOnclickListener(this));
	}

}