package com.sc.android19;

import android.os.Bundle;

import com.google.android.maps.MapActivity;

// C:\Users\Sheraz\.android>keytool -v -list -keystore debug.keystore

public class MainActivity extends MapActivity {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
	}

	@Override
	protected boolean isRouteDisplayed() {
		return false;
	}
}