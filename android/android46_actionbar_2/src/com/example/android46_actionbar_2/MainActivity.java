package com.example.android46_actionbar_2;

import android.app.ActionBar;
import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.MenuItem;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.TextView.OnEditorActionListener;
import android.widget.Toast;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		ActionBar actionBar = getActionBar();
		
		actionBar.setCustomView(R.layout.custom_actionbar);
		 EditText search = (EditText) actionBar.getCustomView().findViewById(R.id.abSearchField);
		 search.setOnEditorActionListener(new OnEditorActionListener() {
			
			@Override
			public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
				Toast.makeText(MainActivity.this, "Search triggered", Toast.LENGTH_SHORT).show();
				return false;
			}
		});
		actionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_CUSTOM | ActionBar.DISPLAY_SHOW_HOME);
	}

//	@Override
//	public boolean onCreateOptionsMenu(Menu menu) {
//		return true;
//	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		return true;
	}

}
