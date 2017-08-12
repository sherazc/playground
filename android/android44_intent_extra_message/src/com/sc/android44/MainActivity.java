package com.sc.android44;

import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.view.Menu;
import android.view.View;
import android.widget.EditText;

public class MainActivity extends Activity {

	public static final String MESSAGE_KEY = "MainActivity.MESSAGE_KEY";
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main_layout);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	public void showMessage(View view) {
		EditText editText = (EditText) findViewById(R.id.main_edit_text_message);
		String message = editText.getText().toString();
		Intent intent = new Intent(this, ShowMessageActivity.class);
		intent.putExtra(MESSAGE_KEY, message);
		startActivity(intent);
	}
}
