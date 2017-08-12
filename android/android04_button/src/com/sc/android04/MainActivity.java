package com.sc.android04;

import android.app.Activity;
import android.content.Intent;

import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends Activity {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		this.addListener();
	}

	private void addListener() {
		final EditText editText01 = (EditText) findViewById(R.id.editText01);
		Button button01 = (Button) findViewById(R.id.button01);

		button01.setOnClickListener(new OnClickListener() {

			public void onClick(View v) {
				try {
					String urlString = editText01.getText().toString();
					if (!urlString.startsWith("http://")) {
						urlString = "http://" + urlString;
					}

					if (!urlString.contains(".")) {
						urlString += ".com";
					}

					Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(urlString));
					startActivity(browserIntent);
				} catch (Exception e) {
					Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://www.google.com"));
					startActivity(browserIntent);
				}
			}
		});
	}
}