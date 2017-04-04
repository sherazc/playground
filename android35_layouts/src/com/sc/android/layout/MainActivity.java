package com.sc.android.layout;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class MainActivity extends Activity {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		addLayoutOnClickListener(R.id.frameLayoutButton, FrameLayoutActivity.class);
		addLayoutOnClickListener(R.id.gridLayoutButton, GridLayoutActivity.class);
		addLayoutOnClickListener(R.id.linearLayoutButton, LinearLayoutActivity.class);
		addLayoutOnClickListener(R.id.relativeLayoutButton, RelativeLayoutActivity.class);
		addLayoutOnClickListener(R.id.dialogThemed, DialogThemedActivity.class);
		addLayoutOnClickListener(R.id.linearLayout2Button, LinearLayoutActivity2.class);
		addLayoutOnClickListener(R.id.tableLayoutButton, TableLayoutActivity.class);
		addLayoutOnClickListener(R.id.screenOrientaion1, ScreenOrientationRelativeLayoutActivity.class);
		addLayoutOnClickListener(R.id.screenOrientaion2, ScreenOrientationLand.class);
		addLayoutOnClickListener(R.id.screenOrientaion3, ScreenOrientationChanges.class);
	}

	private void addLayoutOnClickListener(int buttonId, final Class<? extends Activity> layoutActivity) {
		Button linearLayoutButton = (Button) findViewById(buttonId);
		linearLayoutButton.setOnClickListener(new OnClickListener() {
			public void onClick(View view) {
				Intent linearLayoutIntent = new Intent(view.getContext(), layoutActivity);
				startActivity(linearLayoutIntent);

			}
		});
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}
}
