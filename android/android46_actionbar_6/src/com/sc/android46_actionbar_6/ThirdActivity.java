package com.sc.android46_actionbar_6;

import android.app.ActionBar;
import android.os.Bundle;

public class ThirdActivity extends BaseMenuActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.third_layout);
		ActionBar actionBar = getActionBar();
		// actionBar.setDisplayUseLogoEnabled(false);
		// actionBar.setDisplayHomeAsUpEnabled(true);
		actionBar.setHomeButtonEnabled(true);
	}
}
