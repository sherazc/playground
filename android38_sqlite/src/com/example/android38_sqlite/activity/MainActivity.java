package com.example.android38_sqlite.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.widget.Button;

import com.example.android38_sqlite.R;
import com.example.android38_sqlite.listener.OnClickToActivityListener;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		addButtonsListener();
	}

	private void addButtonsListener() {
		Button buttonShowAllItems = (Button) findViewById(R.id.buttonShowAllItems);
		Button buttonAddItem = (Button) findViewById(R.id.buttonAddItem);
		Button buttonRemoveItem = (Button) findViewById(R.id.buttonRemoveItem);
		Button buttonUpdateItem = (Button) findViewById(R.id.buttonUpdateItem);
		Button buttonFindItem = (Button) findViewById(R.id.buttonFindItem);

		buttonShowAllItems.setOnClickListener(new OnClickToActivityListener(this, ActivityShowAllItems.class));
		buttonAddItem.setOnClickListener(new OnClickToActivityListener(this, ActivityAddItem.class));
		buttonRemoveItem.setOnClickListener(new OnClickToActivityListener(this, ActivityRemoveItem.class));
		buttonUpdateItem.setOnClickListener(new OnClickToActivityListener(this, ActivityUpdateItem.class));
		buttonFindItem.setOnClickListener(new OnClickToActivityListener(this, ActivityFindItems.class));

	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
