package com.sc.android46_actionbar_4;

import android.app.Activity;
import android.app.Fragment;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ShareActionProvider;
import android.widget.ShareActionProvider.OnShareTargetSelectedListener;

// http://www.vogella.com/tutorials/AndroidActionBar/article.html
public class MainActivity extends Activity {

	private ShareActionProvider provider;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		if (savedInstanceState == null) {
			getFragmentManager().beginTransaction().add(R.id.container, new PlaceholderFragment()).commit();
		}
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.main, menu);
		provider = (ShareActionProvider) menu.findItem(R.id.menu_share).getActionProvider();

		// for some reason share button do not work on my phone or on the
		// emulator. One of the forum said to do the following but its not
		// working either.
		provider.setOnShareTargetSelectedListener(new OnShareTargetSelectedListener() {
			@Override
			public boolean onShareTargetSelected(ShareActionProvider source, Intent intent) {
				return false;
			}
		});
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case R.id.menu_share:
			doShare();
			Log.d(MainActivity.class.getCanonicalName(), "menu share");
			break;
		default:
			Log.d(MainActivity.class.getCanonicalName(), "menu default");
			break;
		}
		return true;
	}

	private void doShare() {
		Intent intent = new Intent(Intent.ACTION_SEND);
		intent.setType("text/plain");
		intent.putExtra(Intent.EXTRA_TEXT, "This is a message for you.");
		provider.setShareIntent(intent);
	}

	public static class PlaceholderFragment extends Fragment {
		public PlaceholderFragment() {
		}

		@Override
		public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
			View rootView = inflater.inflate(R.layout.fragment_main, container, false);
			return rootView;
		}
	}
}