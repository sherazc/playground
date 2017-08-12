package com.sc.android23;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageButton;
import android.widget.Toast;

public class MainActivity extends Activity {
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		addListnerOnButton();
	}

	private void addListnerOnButton() {
		ImageButton imageButton = (ImageButton) findViewById(R.id.imageButton1);

		imageButton.setOnClickListener(new OnClickListener() {

			public void onClick(View v) {
				Toast.makeText(MainActivity.this, "Image button is clicked", Toast.LENGTH_SHORT).show();
			}
		});

	}
}