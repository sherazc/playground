package com.sc.android46_actionbar_5;

import android.app.ActionBar;
import android.os.Bundle;

public class ThirdActivity extends BaseMenuActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.third_layout);
		ActionBar actionBar = getActionBar();
		actionBar.setHomeButtonEnabled(true);
	}
}
