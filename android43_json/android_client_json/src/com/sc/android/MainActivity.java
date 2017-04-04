package com.sc.android;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.StrictMode;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.sc.android.utils.HttpUtils;

public class MainActivity extends Activity implements OnClickListener {
	// http://www.vogella.com/tutorials/AndroidJSON/article.html

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		Button buttonAllStoreItems = (Button) findViewById(R.id.main_button_all_store_items);
		buttonAllStoreItems.setOnClickListener(this);
		// Just for testing, allow network access in the main thread
		// NEVER use this is productive code
		// this is done to avoid Async task
		StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
		StrictMode.setThreadPolicy(policy);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		boolean result;
		switch (item.getItemId()) {
		case R.id.activityOne:
			this.startActivity(new Intent(this, ActivityOne.class));
			result = true;
			break;
		case R.id.activityTwo:
			this.startActivity(new Intent(this, ActivityTwo.class));
			result = true;
			break;
		default:
			result = super.onOptionsItemSelected(item);
			break;
		}
		return result;
	}

	@Override
	public void onClick(View v) {
		StringBuilder stringBuilder = getAllStoreItemsJson();
		TextView textView = (TextView) findViewById(R.id.main_text_all_store_items);
		textView.setText(stringBuilder);
	}

	private StringBuilder getAllStoreItemsJson() {
		EditText editTextUrl = (EditText) findViewById(R.id.main_text_url);
		StringBuilder stringBuilder = new StringBuilder();
		try {
			String responseJson = HttpUtils.sendRequest(HttpUtils.METHOD_GET, editTextUrl.getText().toString(), null,
					null);
			stringBuilder.append(responseJson);
		} catch (Exception e) {
			stringBuilder.append("Error: " + e.getMessage());
			Log.e("android_client_jsong", e.getMessage());
		}
		return stringBuilder;
	}
}
