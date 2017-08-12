package com.sc.android17;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends Activity {
	private final Context context = this;
	private Button button;
	private EditText result;

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.main);

		button = (Button) findViewById(R.id.buttonPrompt);
		result = (EditText) findViewById(R.id.editTextResult);

		button.setOnClickListener(new OnClickListener() {

			public void onClick(View v) {
				LayoutInflater layoutInflater = LayoutInflater.from(context);
				View promptsView = layoutInflater.inflate(R.layout.prompts, null);

				AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(context);

				alertDialogBuilder.setView(promptsView);

				final EditText userInput = (EditText) promptsView.findViewById(R.id.editTextDialogUserInput);

				alertDialogBuilder.setCancelable(false);

				alertDialogBuilder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
					@Override
					public void onClick(DialogInterface dialog, int which) {
						result.setText(userInput.getText());
					}
				});

				alertDialogBuilder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
					@Override
					public void onClick(DialogInterface dialog, int which) {
						dialog.cancel();
					}
				});

				alertDialogBuilder.create().show();
			}
		});
	}
}