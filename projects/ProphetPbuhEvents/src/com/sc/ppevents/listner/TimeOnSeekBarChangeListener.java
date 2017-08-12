package com.sc.ppevents.listner;

import com.sc.ppevents.view.RealViewSwitcher;

import android.widget.SeekBar;
import android.widget.SeekBar.OnSeekBarChangeListener;

public class TimeOnSeekBarChangeListener implements OnSeekBarChangeListener {

	private RealViewSwitcher realViewSwitcher;
	
	public TimeOnSeekBarChangeListener(RealViewSwitcher realViewSwitcher) {
		this.realViewSwitcher = realViewSwitcher;
	}
	
	public void onProgressChanged(SeekBar seekBar, int progress,
			boolean fromUser) {
		if (fromUser) {
			realViewSwitcher.setCurrentScreen(progress);
		}
	}

	public void onStartTrackingTouch(SeekBar seekBar) {
		// TODO Auto-generated method stub
		
	}

	public void onStopTrackingTouch(SeekBar seekBar) {
		// TODO Auto-generated method stub
		
	}

}
