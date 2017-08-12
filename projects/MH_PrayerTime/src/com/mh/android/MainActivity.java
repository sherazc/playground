package com.mh.android;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

import android.app.Activity;
import android.os.Bundle;
import android.view.ViewGroup.LayoutParams;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.mh.android.entity.Label;
import com.mh.android.entity.Tag;
import com.mh.android.entity.Time;
import com.mh.android.io.URLContentUtil;
import com.mh.android.service.TagLoader;

public class MainActivity extends Activity {

	private LayoutParams fillFill = new LinearLayout.LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
	private LayoutParams fillWrap = new LinearLayout.LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);

	// private LayoutParams wrapFill = new
	// LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT,
	// LayoutParams.FILL_PARENT);
	// private LayoutParams wrapWrap = new
	// LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT,
	// LayoutParams.WRAP_CONTENT);

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		// setContentView(R.layout.main);
		// initTime();
		initLayout();
	}
	
	@Override
	protected void onResume() {
		// TODO Auto-generated method stub
		super.onResume();
		initLayout();
	}

	private void initLayout() {
		LinearLayout layout = new LinearLayout(this);

		List<Tag[]> tagRows = loadRows();

		Tag[] azanIqamaHeaderRow = getAzanIqamaHeaderRow();
		addTimeRow(layout, azanIqamaHeaderRow);

		if (tagRows != null && tagRows.size() > 0) {
			for (Tag[] rowData : tagRows) {
				addTimeRow(layout, rowData);
			}
		}

		this.addContentView(layout, fillFill);
	}
	
	private Tag[] getAzanIqamaHeaderRow() {

		return new Tag[] { new Label(""), new Label("Athan"), new Label("Iqama") };
	}

	private void addTimeRow(LinearLayout layout, Tag[] rowData) {
		layout.setOrientation(LinearLayout.VERTICAL);

		LinearLayout rowLayout = new LinearLayout(this);
		rowLayout.setOrientation(LinearLayout.HORIZONTAL);

		TextView rowLabeltextView = timeOrLableTextView(rowData[0]);
		TextView time1TextView = timeOrLableTextView(rowData[1]);
		TextView time2TextView = null;
		if (rowData.length > 2) {
			time2TextView = timeOrLableTextView(rowData[2]);
		}

		rowLayout.addView(rowLabeltextView, 150, LayoutParams.WRAP_CONTENT);
		rowLayout.addView(time1TextView, 120, LayoutParams.WRAP_CONTENT);
		if (time2TextView != null) {
			rowLayout.addView(time2TextView, 120, LayoutParams.WRAP_CONTENT);
		}
		// addClockOrLable(rowLayout, rowData[1]);
		layout.addView(rowLayout, fillWrap);
	}

	private TextView timeOrLableTextView(Tag tag) {
		TextView textView = new TextView(this);
		if (tag instanceof Time) {
			Time time = (Time) tag;
			String timeText = formatTime(time);
			textView.setText(timeText);
		} else if (tag instanceof Label) {
			Label label = (Label) tag;
			textView.setText(label.getLabel());
		}
		return textView;
	}

	private String formatTime(Time time) {
		if (time == null || time.getHour() < 1) {
			return "";
		}

		String result = "";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("hh:mm aaa");
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.HOUR, time.getHour());
		calendar.set(Calendar.MINUTE, time.getMinute());
		if (time.getAmPm() == Time.AM) {
			calendar.set(Calendar.AM_PM, Calendar.AM);
		} else {
			calendar.set(Calendar.AM_PM, Calendar.PM);
		}

		try {
			result = simpleDateFormat.format(calendar.getTime());
		} catch (Exception e) {
		}
		return result;
	}

	// private void addClockOrLable(LinearLayout layout, Tag tag) {
	// LinearLayout clockLayout = new LinearLayout(this);
	// clockLayout.setOrientation(LinearLayout.VERTICAL);
	//
	// if (tag instanceof Time) {
	// Time timeTag = (Time) tag;
	// AnalogClock analogClock = new AnalogClock(this);
	//
	// // analogClock
	// DigitalClock digitalClock = new DigitalClock(this);
	//
	// clockLayout.addView(analogClock, 50, 50);
	// clockLayout.addView(digitalClock, wrapWrap);
	// } else {
	// Label lableTag = (Label) tag;
	// TextView textView = new TextView(this);
	// textView.setText(lableTag.getLabel());
	// clockLayout.addView(textView, wrapWrap);
	// }
	//
	// }

	private List<Tag[]> loadRows() {
		String url = getString(R.string.web_url);
		URLContentUtil urlContentUtil = new URLContentUtil();
		String data = urlContentUtil.readStringFromURLResponse(url);
		if (data == null) {
			Toast.makeText(this, "unable to load data from " + url, Toast.LENGTH_LONG).show();
			return null;
		}

		TagLoader tagLoader = new TagLoader(this);
		return tagLoader.loadTagRows(data);
	}
}