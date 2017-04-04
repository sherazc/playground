package com.sc.android26;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.telephony.PhoneStateListener;
import android.telephony.TelephonyManager;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends Activity {
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		Button callButton = (Button) findViewById(R.id.callButton);

		PhoneCallListener phoneCallListener = new PhoneCallListener(this);

		TelephonyManager telephonyManager = (TelephonyManager) this.getSystemService(Context.TELEPHONY_SERVICE);
		telephonyManager.listen(phoneCallListener, PhoneStateListener.LISTEN_CALL_STATE);

		callButton.setOnClickListener(new OnClickListener() {

			public void onClick(View v) {
				Intent callIntent = new Intent(Intent.ACTION_CALL);
				EditText phoneText = (EditText) findViewById(R.id.phoneEditText);
				callIntent.setData(Uri.parse("tel:" + phoneText.getText()));
				startActivity(callIntent);

			}
		});

	}
}