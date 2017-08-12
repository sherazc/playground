package com.sc.rotd.app;

import android.os.Bundle;
import android.support.v4.app.NavUtils;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.CheckBox;
import android.widget.TextView;
import com.sc.rotd.api.utils.CommonUtils;
import com.sc.rotd.app.persistence.SharedPreferencesManager;
import com.sc.rotd.app.service.NotificationAlarm;
import com.sc.rotd.app.view.TimePickerFragment;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class SettingsActivity extends ActionBarActivity {

    public static final String SETTING_REMINDER_TIME_KEY = "SETTING_REMINDER_TIME_KEY";
    public static final String REMINDER_SERVICE_SWITCH_KEY = "REMINDER_SERVICE_SWITCH_KEY";

    private static final String TAG = SettingsActivity.class.getName();
    private static final SimpleDateFormat DIGITAL_CLOCK_FORMAT = new SimpleDateFormat("hh:mm");
    private static final SimpleDateFormat DIGITAL_CLOCK_FORMAT_AM_PM = new SimpleDateFormat("a");

    private Calendar reminderTime;
    private TextView digitalClockTime;
    private TextView digitalClockAmPm;
    private TimePickerFragment timePickerFragment;
    private SharedPreferencesManager sharedPreferencesManager;
    private CheckBox reminder_service_switch;
    private NotificationAlarm notificationAlarm;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);

        sharedPreferencesManager = new SharedPreferencesManager(this);
        notificationAlarm = NotificationAlarm.createInstance(this);
        reminderTime = notificationAlarm.persistedReminderTime();
        timePickerFragment = new TimePickerFragment();
        timePickerFragment.setSettingsActivity(this);
        digitalClockTime = (TextView) findViewById(R.id.setting_digital_clock_time);
        digitalClockAmPm = (TextView) findViewById(R.id.setting_digital_clock_am_pm);
        reminder_service_switch = (CheckBox) findViewById(R.id.reminder_service_switch);

        recreateReminderServiceSwitch(reminder_service_switch);
        recreateReminderTime(reminderTime);

        loadToolbar();
    }

    private void recreateReminderServiceSwitch(CheckBox reminder_service_switch) {

        String spReminderServiceSwitch = sharedPreferencesManager.findStringValue(REMINDER_SERVICE_SWITCH_KEY);

        if (CommonUtils.isBlank(spReminderServiceSwitch)) {
            sharedPreferencesManager.saveStringValue(REMINDER_SERVICE_SWITCH_KEY, Boolean.TRUE.toString());
            spReminderServiceSwitch = Boolean.TRUE.toString();
        }
        reminder_service_switch.setChecked(Boolean.parseBoolean(spReminderServiceSwitch));
    }

    public void recreateReminderTime(Calendar calendar) {
        if (calendar == null) {
            return;
        }
        this.reminderTime = calendar;

        this.sharedPreferencesManager.saveLongValue(SettingsActivity.SETTING_REMINDER_TIME_KEY,
                this.reminderTime.getTimeInMillis());
        try {
            digitalClockTime.setText(DIGITAL_CLOCK_FORMAT.format(reminderTime.getTime()));
            digitalClockAmPm.setText(DIGITAL_CLOCK_FORMAT_AM_PM.format(reminderTime.getTime()));
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
        }
        notificationAlarm.setupOrCancelNotificationAlarm();
    }

    private void loadToolbar() {
        Toolbar toolbar = (Toolbar) findViewById(R.id.app_bar_simple);
        toolbar.setTitle("Settings");
        toolbar.setSubtitle(null);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

    public void showTimePickerDialog(View v) {
        timePickerFragment.setHour(reminderTime.get(Calendar.HOUR_OF_DAY));
        timePickerFragment.setMinute(reminderTime.get(Calendar.MINUTE));
        timePickerFragment.show(getSupportFragmentManager(), "timePicker");
    }

    public void toggleReminderService(View view) {
        CheckBox serviceSwitch = (CheckBox) view;
        boolean checked = serviceSwitch.isChecked();
        sharedPreferencesManager.saveStringValue(REMINDER_SERVICE_SWITCH_KEY, checked + "");

        notificationAlarm.setupOrCancelNotificationAlarm();
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                NavUtils.navigateUpFromSameTask(this);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
