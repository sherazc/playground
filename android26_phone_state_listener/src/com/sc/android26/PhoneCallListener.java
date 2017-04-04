package com.sc.android26;

import android.content.Context;
import android.content.Intent;
import android.telephony.PhoneStateListener;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.widget.Toast;

public class PhoneCallListener extends PhoneStateListener {

	private boolean isPhoneCalling = false;

	private Toast toast;
	private Context context;
	private static final String LOG_TAG = "android26";

	public PhoneCallListener(Context context) {
		super();

		this.toast = Toast.makeText(context, null, Toast.LENGTH_SHORT);
		this.context = context;
	}

	@Override
	public void onCallStateChanged(int state, String incomingNumber) {
		String message = "";
		switch (state) {
		case TelephonyManager.CALL_STATE_RINGING:
			message = "Phone Ringing incomingNumber:" + incomingNumber;
			break;
		case TelephonyManager.CALL_STATE_OFFHOOK:
			message = "Phone Offhook incomingNumber:" + incomingNumber;
			isPhoneCalling = true;
			break;
		case TelephonyManager.CALL_STATE_IDLE:
			Log.i(LOG_TAG, "IDLE");

			if (isPhoneCalling) {
				Log.i(LOG_TAG, "restart app");
				Intent intent = context.getPackageManager().getLaunchIntentForPackage(context.getPackageName());

				intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
				context.startActivity(intent);
				isPhoneCalling = false;
				message = "Phone Idle incomingNumber:" + incomingNumber;
			}
			break;

		default:
			message = "default state:" + state + " incomingNumber:" + incomingNumber;
			break;
		}

		toast.setText(message);
		Log.i(LOG_TAG, message);

	}
}
