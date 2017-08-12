package com.sc.ppevents;

import java.util.List;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.view.Window;
import android.widget.SeekBar;

import com.sc.ppevents.listner.TimeOnSeekBarChangeListener;
import com.sc.ppevents.view.RealViewSwitcher;

public class MainActivity extends Activity {

	private PageViewHandler pageViewHandler;
	private CoverPageHandler coverPageHandler;
	private IntroPageHandler introPageHandler;

	public MainActivity() {
		pageViewHandler = new PageViewHandler(this);
		coverPageHandler = new CoverPageHandler(this);
		introPageHandler = new IntroPageHandler(this);
	}

	public void onCreate(Bundle savedInstanceState) {
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		super.onCreate(savedInstanceState);

		setContentView(R.layout.main);

		RealViewSwitcher realViewSwitcher = (RealViewSwitcher) findViewById(R.id.slider);
		SeekBar seekBar = (SeekBar) findViewById(R.id.seekbar);

		coverPageHandler.setRealViewSwitcher(realViewSwitcher);
		coverPageHandler.setSeekBar(seekBar);

		realViewSwitcher.addView(coverPageHandler.createTilePage());
		List<View> introPages = introPageHandler.createIntroViews();
		if (introPages != null) {
			for(View view : introPages) {
				realViewSwitcher.addView(view);
			}
		}
		
		pageViewHandler.createPages(realViewSwitcher);
		int pageCount = realViewSwitcher.getChildCount();

		seekBar.setProgress(0);
		seekBar.setMax(pageCount);
		seekBar.setOnSeekBarChangeListener(new TimeOnSeekBarChangeListener(
				realViewSwitcher));
		realViewSwitcher.setSeekBar(seekBar);

	}

	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
