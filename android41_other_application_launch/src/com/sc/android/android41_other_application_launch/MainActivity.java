package com.sc.android.android41_other_application_launch;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends Activity implements OnClickListener {

	private Button buttonUrl;
	private Button buttonTelephone;
	private Button buttonMap;
	private Button buttonStreetView;
	private Button buttonSms;
	private Button buttonEmail;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.main);

		initViews();
	}

	private void initViews() {
		buttonUrl = (Button) findViewById(R.id.buttonUrl);
		buttonTelephone = (Button) findViewById(R.id.buttonTelephone);
		buttonMap = (Button) findViewById(R.id.buttonMap);
		buttonStreetView = (Button) findViewById(R.id.buttonStreetView);
		buttonSms = (Button) findViewById(R.id.buttonSms);
		buttonEmail = (Button) findViewById(R.id.buttonEmail);

		buttonUrl.setOnClickListener(this);
		buttonTelephone.setOnClickListener(this);
		buttonMap.setOnClickListener(this);
		buttonStreetView.setOnClickListener(this);
		buttonSms.setOnClickListener(this);
		buttonEmail.setOnClickListener(this);
	}

	@Override
	public void onClick(View view) {
		Log.i(MainActivity.class.getName(), "On Click Called.");

		Intent intent = new Intent();

		switch (view.getId()) {
		case R.id.buttonUrl:

			intent.setAction(Intent.ACTION_VIEW);
			intent.setData(Uri.parse("http://www.google.com"));
			break;
		case R.id.buttonTelephone:
			intent.setAction(Intent.ACTION_DIAL);
			intent.setData(Uri.parse("tel:(800) 000 0000"));
			break;
		case R.id.buttonMap:
			intent.setAction(Intent.ACTION_VIEW);
			intent.setData(Uri.parse("geo:0,0?q=el+paso,+tx"));
			break;
		case R.id.buttonStreetView:
			intent.setAction(Intent.ACTION_VIEW);
			intent.setData(Uri.parse("google.streetview:cbll=42.379069,-71.116564&cbp=12,60,,0,-1.21&mz=18"));
			break;
		case R.id.buttonSms:
			intent.setAction(Intent.ACTION_VIEW);
			intent.setData(Uri.parse("sms:(800) 000 0000"));
			break;
		case R.id.buttonEmail:
			intent.setAction(Intent.ACTION_SEND);
			intent.setType("text/plan");
			intent.putExtra(Intent.EXTRA_EMAIL, new String[] {"email@gmail.com"});
			intent.putExtra(Intent.EXTRA_SUBJECT, "Email Subject");
			intent.putExtra(Intent.EXTRA_TEXT, "Email Body");
			break;
		default:
			Log.i(MainActivity.class.getName(), "Bad Intent.");
			break;
		}
		
		try {
			startActivity(intent);
		} catch (ActivityNotFoundException e) {
			showMessage("Activity not found. " + e.getMessage());
		}
	}

	private void showMessage(CharSequence text) {
		Toast toast = Toast.makeText(getApplicationContext(), text, Toast.LENGTH_SHORT);
		toast.show();
	}
}
