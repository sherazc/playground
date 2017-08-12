package com.sc.android;

import android.os.Bundle;
import android.os.Handler;
import android.app.Activity;
import android.view.Menu;
import android.widget.ViewSwitcher;

public class MainActivity extends Activity {

	private ViewSwitcher switcher;
	private static final int REFRESH_SCREEN = 1;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		switcher = (ViewSwitcher) findViewById(R.id.profileSwitcher);
		startScan();
	}

	private void startScan() {
		new Thread() {
			public void run() {
				try {
					Thread.sleep(2000);
					hRefresh.sendEmptyMessage(REFRESH_SCREEN);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		}.start();
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.activity_main, menu);
		return true;
	}

	Handler hRefresh = new Handler() {
		public void handleMessage(android.os.Message msg) {
			switch (msg.what) {
			case REFRESH_SCREEN:
				switcher.showNext();
				break;
			default:
				break;
			}

		}
	};
}
