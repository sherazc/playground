package com.sc.android14;

import java.util.Calendar;

import android.app.Activity;
import android.app.Dialog;
import android.app.TimePickerDialog;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.Button;
import android.widget.TextView;
import android.widget.TimePicker;

public class MainActivity extends Activity {

	private static final int TIME_DIALOG_ID = 999;

	private TextView tvDisplayTime;
	private TimePicker timePicker1;
	private Button buttonChangeTime;

	private int hour;
	private int minute;

	private TimePickerDialog.OnTimeSetListener timePickerListener = new TimePickerDialog.OnTimeSetListener() {

		public void onTimeSet(TimePicker view, int hourOfDay, int minute) {
			MainActivity.this.hour = hourOfDay;
			MainActivity.this.minute = minute;

			initTimePicker();
		}
	};

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.main);
		loadResources();
		setCurrentTimeOnView();
		addListenerOnButton();

	}

	private void addListenerOnButton() {
		buttonChangeTime.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {
				showDialog(TIME_DIALOG_ID);

			}
		});

	}

	protected Dialog onCreateDialog(int id) {
		switch (id) {
		case TIME_DIALOG_ID:
			return new TimePickerDialog(this, timePickerListener, hour, minute, false);
		}
		return null;
	}

	private void setCurrentTimeOnView() {
		Calendar calendar = Calendar.getInstance();
		hour = calendar.get(Calendar.HOUR_OF_DAY);
		minute = calendar.get(Calendar.MINUTE);
		initTimePicker();
	}

	private void loadResources() {
		tvDisplayTime = (TextView) findViewById(R.id.tvTime);
		timePicker1 = (TimePicker) findViewById(R.id.timePicker1);
		buttonChangeTime = (Button) findViewById(R.id.buttonChangeTime);
	}

	private void initTimePicker() {
		tvDisplayTime.setText(pad(hour) + ":" + pad(minute));
		timePicker1.setCurrentHour(hour);
		timePicker1.setCurrentMinute(minute);
	}

	private static String pad(int c) {
		if (c > 9) {
			return "" + c;
		} else {
			return "0" + c;
		}
	}
}