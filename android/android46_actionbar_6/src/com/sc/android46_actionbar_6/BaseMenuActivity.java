package com.sc.android46_actionbar_6;

import android.app.ActionBar;
import android.app.Activity;
import android.content.Intent;
import android.view.Menu;
import android.view.MenuItem;

public class BaseMenuActivity extends Activity {

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.main, menu);
		ActionBar actionBar = getActionBar();
		actionBar.setDisplayUseLogoEnabled(false);
		actionBar.setDisplayHomeAsUpEnabled(true);
		return true;
	}

	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case android.R.id.home:
			// Intent intentMain = new Intent(this, MainActivity.class);
			// TODO for some reason this line only works for home button. Figure
			// out why and what do we need to do remove activity history.
			// intentMain.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
			// startActivity(intentMain);
			break;
		case R.id.action_activity2:
			Intent intentActivity2 = new Intent(this, SecondActivity.class);
			// intentActivity2.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
			startActivity(intentActivity2);
			break;
		case R.id.action_activity3:
			Intent intentActivity3 = new Intent(this, ThirdActivity.class);
			// intentActivity3.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
			startActivity(intentActivity3);
			break;
		default:
			break;
		}
		return true;
	}
}
