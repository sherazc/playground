package com.sc.android44;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

public class ShowMessageActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.show_message_layout);
		TextView textView = (TextView) findViewById(R.id.show_text_view_message);
		Intent intent = getIntent();
		String message = intent.getExtras().getString(MainActivity.MESSAGE_KEY);
		textView.setText("Message: " + message);
	}
}
