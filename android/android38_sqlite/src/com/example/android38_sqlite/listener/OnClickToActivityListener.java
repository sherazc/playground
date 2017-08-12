package com.example.android38_sqlite.listener;

import android.app.Activity;
import android.content.Intent;
import android.view.View;
import android.view.View.OnClickListener;

public class OnClickToActivityListener implements OnClickListener {

	private Activity source;
	private Class<? extends Activity> destination;
	
	public OnClickToActivityListener(Activity source, Class<? extends Activity> destination) {
		this.source = source;
		this.destination = destination;
	}
	
	@Override
	public void onClick(View v) {
		Intent intent = new Intent(v.getContext(), destination);
		source.startActivity(intent);
	}

}
