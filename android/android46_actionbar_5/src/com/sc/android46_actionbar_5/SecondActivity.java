package com.sc.android46_actionbar_5;

import android.app.ActionBar;
import android.os.Bundle;

// http://www.vogella.com/tutorials/AndroidActionBar/article.html

public class SecondActivity extends BaseMenuActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.second_layout);
		ActionBar actionBar = getActionBar();
		actionBar.setHomeButtonEnabled(true);
	}
}
