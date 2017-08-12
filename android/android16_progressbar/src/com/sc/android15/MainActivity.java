package com.sc.android15;

import android.app.Activity;
import android.app.ProgressDialog;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.Button;

public class MainActivity extends Activity {

	private Button buttonStartProgress;
	private ProgressDialog progressBar;

	private int progressBarStatus = 0;
	private Handler progressBarHandler = new Handler();

	private long downloadedFileSize = 0;
	private long fileSize = 1000L;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.main);

		addListenerOnButton();
	}

	private void addListenerOnButton() {
		buttonStartProgress = (Button) findViewById(R.id.buttonStartProgress);

		buttonStartProgress.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				progressBar = new ProgressDialog(v.getContext());
				progressBar.setCancelable(true);
				progressBar.setMessage("File downloading...");
				progressBar.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
				progressBar.setProgress(0);
				progressBar.setMax(100);
				progressBar.show();

				progressBarStatus = 0;

				downloadedFileSize = 0;

				new Thread(new Runnable() {

					@Override
					public void run() {
						while (progressBarStatus < 100) {
							progressBarStatus = doSomeTasks();
//							progressBar.setProgress(progressBarStatus);
							try {
								Thread.sleep(100);
							} catch (InterruptedException e) {
								e.printStackTrace();
							}
							progressBarHandler.post(new Runnable() {

								@Override
								public void run() {
									progressBar.setProgress(progressBarStatus);

								}
							});
						}

						// This block is to wait for 2 seconds and then dismiss progress dialog.
						if (progressBarStatus >= 100) {
							
							try {
								Thread.sleep(2000);
							} catch (InterruptedException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}

							progressBar.dismiss();
						}
					}

				}).start();
			}
		});

	}

	public int doSomeTasks() {
		downloadedFileSize += 10;
		return (int) ((double) downloadedFileSize / fileSize * 100);
	}
}