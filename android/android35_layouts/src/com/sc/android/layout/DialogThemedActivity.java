package com.sc.android.layout;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.LinearLayout;

public class DialogThemedActivity extends Activity implements OnClickListener {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.dialog_layout);
		Button closeButton = (Button) findViewById(R.id.closeDialogTheme);
		
		closeButton.setOnClickListener(this);
		
	}

	public void onClick(View v) {
		finish();
	}
	
}
