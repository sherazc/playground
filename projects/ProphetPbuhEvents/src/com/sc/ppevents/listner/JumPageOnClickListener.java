package com.sc.ppevents.listner;

import com.sc.ppevents.view.RealViewSwitcher;

import android.view.View;
import android.view.View.OnClickListener;
import android.widget.SeekBar;

public class JumPageOnClickListener implements OnClickListener {

	private int pageNumber;
	private SeekBar seekBar;
	private RealViewSwitcher realViewSwitcher;

	public JumPageOnClickListener(int pageNumber, SeekBar seekBar, RealViewSwitcher realViewSwitcher) {
		this.pageNumber = pageNumber;
		this.seekBar = seekBar;
		this.realViewSwitcher = realViewSwitcher;
	}

	public void onClick(View v) {
		this.seekBar.setProgress(pageNumber);
		this.realViewSwitcher.setCurrentScreen(pageNumber);
	}

}
