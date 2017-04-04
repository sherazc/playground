package com.sc.android13;

import java.util.Calendar;

import android.app.Activity;
import android.app.DatePickerDialog;
import android.app.Dialog;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.TextView;

public class MainActivity extends Activity {

	private static final int DATE_DIALOG_ID = 999;

	private TextView tvDisplayDate;
	private DatePicker dpResult;
	private Button buttonChangeDate;

	private int year;
	private int month;
	private int day;

	private DatePickerDialog.OnDateSetListener datePickerListener = new DatePickerDialog.OnDateSetListener() {
		public void onDateSet(DatePicker view, int selectedYear, int selectedMonth, int selectedDay) {
			year = selectedYear;
			month = selectedMonth;
			day = selectedDay;
			initDatePicker();

		}
	};

	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.main);

		loadResources();
		setCurrentDateOnView();
		addListnerOnButton();

	}

	private void loadResources() {
		tvDisplayDate = (TextView) findViewById(R.id.tvDate);
		dpResult = (DatePicker) findViewById(R.id.dpResult);
		buttonChangeDate = (Button) findViewById(R.id.buttonChangeDate);
	}

	private void addListnerOnButton() {
		buttonChangeDate.setOnClickListener(new OnClickListener() {

			public void onClick(View v) {
				showDialog(DATE_DIALOG_ID);
			}
		});
	}

	private void initDatePicker() {
		tvDisplayDate.setText(buildDateString());
		dpResult.init(year, month, day, null);
	}

	private StringBuilder buildDateString() {
		return new StringBuilder().append(month + 1).append("-").append(day).append("-").append(year).append(" ");
	}

	private void setCurrentDateOnView() {
		final Calendar calendar = Calendar.getInstance();
		year = calendar.get(Calendar.YEAR);
		month = calendar.get(Calendar.MONTH);
		day = calendar.get(Calendar.DAY_OF_MONTH);

		initDatePicker();

	}

	@Override
	protected Dialog onCreateDialog(int id) {
		switch (id) {
		case DATE_DIALOG_ID:
			return new DatePickerDialog(this, datePickerListener, year, month, day);
		}
		return null;
	}
}