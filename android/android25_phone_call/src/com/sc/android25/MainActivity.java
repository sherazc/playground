package com.sc.android25;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends Activity {
	// This fixes warning on my Atrix
	// http://alldroid.org/archived/threads/14925.html
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		Button buttonCall = (Button) findViewById(R.id.buttonCall);
		buttonCall.setOnClickListener(new OnClickListener() {

			public void onClick(View v) {
				EditText editText = (EditText) findViewById(R.id.phoneText);
				Intent callIntent = new Intent(Intent.ACTION_CALL);
				callIntent.setData(Uri.parse("tel:" + editText.getText()));
				startActivity(callIntent);
			}
		});
	}
}