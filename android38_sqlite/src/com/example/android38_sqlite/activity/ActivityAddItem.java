package com.example.android38_sqlite.activity;

import android.app.Activity;
import android.os.Bundle;
import android.widget.Button;

import com.example.android38_sqlite.R;
import com.example.android38_sqlite.listener.AddItemOnClickListener;

public class ActivityAddItem extends Activity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.add_item);
		
		Button buttonAddItem = (Button) findViewById(R.id.buttonAddItem);
		buttonAddItem.setOnClickListener(new AddItemOnClickListener(this));
	}
}
