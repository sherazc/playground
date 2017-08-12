package com.example.android46_actionbar_3;

import android.app.ActionBar;
import android.app.Activity;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TextView;

public class MainActivity extends Activity {

	private MenuItem menuItem;
	private TextView mainThreadProgressLabel;
	private TextView backgroudThreadProgressLabel;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		ActionBar actionBar = getActionBar();
		actionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_HOME | ActionBar.DISPLAY_SHOW_TITLE
				| ActionBar.DISPLAY_SHOW_CUSTOM);

		mainThreadProgressLabel = (TextView) findViewById(R.id.mainThreadProgressLabel);
		backgroudThreadProgressLabel = (TextView) findViewById(R.id.backgroudThreadProgressLabel);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case R.id.main_load:
			mainThreadProgressLabel.setText("Started");
			menuItem = item;
			menuItem.setActionView(R.layout.progress_bar);
			menuItem.expandActionView();
			TestTask task = new TestTask();
			mainThreadProgressLabel.setText("Working");
			// we can pass in optional message parameters to background thread
			task.execute("test");
			mainThreadProgressLabel.setText("Complete");
			break;
		default:
			break;
		}

		return true;
	}

	private void changeTextViewText(final TextView textView, final String text) {
		// called this method because backgroud process need to update UI's view
		runOnUiThread(new Runnable() {
			@Override
			public void run() {
				textView.setText(text);

			}
		});
	}

	private class TestTask extends AsyncTask<String, Void, String> {

		@Override
		protected String doInBackground(String... params) {
			changeTextViewText(backgroudThreadProgressLabel, "Started");
			mySleep(2000);
			changeTextViewText(backgroudThreadProgressLabel, "Working");
			mySleep(2000);
			return null;
		}

		@Override
		protected void onPostExecute(String result) {
			menuItem.collapseActionView();
			menuItem.setActionView(null);
			changeTextViewText(backgroudThreadProgressLabel, "Complete");
		}
	}

	private void mySleep(long milliseconds) {
		try {
			Thread.sleep(2000);
		} catch (Exception e) {
			Log.e(this.getClass().getCanonicalName(), e.getMessage());
		}
	}
}
