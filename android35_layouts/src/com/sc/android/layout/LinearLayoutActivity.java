package com.sc.android.layout;

import android.app.Activity;
import android.os.Bundle;
import android.widget.LinearLayout;
import android.widget.TextView;

public class LinearLayoutActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.linear_layout);
		
		LinearLayout linearLayout = (LinearLayout) findViewById(R.id.linear_layout);
		
		TextView textView = new TextView(this);
		textView.setText("Text Added In Java!");
		int lHeight = LinearLayout.LayoutParams.WRAP_CONTENT;
		int lWidht = LinearLayout.LayoutParams.WRAP_CONTENT;
		linearLayout.addView(textView, new LinearLayout.LayoutParams(lHeight, lWidht));
		
	}
}
