package com.sc.android;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

public class MainActivity extends Activity implements Runnable {

	private ViewGroup mainView;
	private View view1;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		mainView = (ViewGroup) findViewById(R.id.mainLayout);
		view1 = (View) findViewById(R.id.progressBarLayout);

		//Thread thread = new Thread(this);
		//thread.start();
		this.run();

	}

	public View createMainView() {

		return null;

	}
	
	@Override
	protected void onPostCreate(Bundle savedInstanceState) {
		this.run();
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	public void run() {
		try {
			Thread.sleep(10000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		TextView textView = new TextView(this);
		textView.setText("This took a long time to load");
		textView.setTextSize(50);
		mainView.removeView(view1);
		mainView.addView(textView);
	}
}
