package com.sc.android17;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.view.View;
import android.view.View.OnClickListener;

public class AlertOnclickListener implements OnClickListener {

	private MainActivity context;

	public AlertOnclickListener(MainActivity context) {
		this.context = context;
	}

	public void onClick(View view) {

		AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(context);
		alertDialogBuilder.setTitle("Alert Dialog Title");
		alertDialogBuilder.setMessage("Click yes to exit!");
		alertDialogBuilder.setCancelable(false);

		alertDialogBuilder.setPositiveButton("Yes", new DialogInterface.OnClickListener() {

			public void onClick(DialogInterface dialog, int which) {
				context.finish();

			}
		});

		alertDialogBuilder.setNegativeButton("No", new DialogInterface.OnClickListener() {

			public void onClick(DialogInterface dialog, int which) {
				dialog.cancel();

			}
		});

		AlertDialog alertDialog = alertDialogBuilder.create();
		alertDialog.show();

	}

}
