package com.sc.android.android39_sound;

import java.io.FileDescriptor;
import java.io.IOException;

import android.app.Activity;
import android.content.res.Resources.NotFoundException;
import android.media.MediaPlayer;
import android.media.MediaPlayer.OnCompletionListener;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

public class MainActivity extends Activity implements OnClickListener, OnCompletionListener {

	private MediaPlayer mediaPlayer;
	private ImageButton buttonPlayPause;
	private ImageButton buttonStop;
	private ImageView carImage;
	private TextView textStatus;
	private boolean stopped;
	private int carsA[] = new int[] { R.drawable.car_a_stop, R.drawable.car_a_pause, R.drawable.car_a_play };
	private int carsB[] = new int[] { R.drawable.car_b_stop, R.drawable.car_b_pause, R.drawable.car_b_play };
	private int cars[] = carsA;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		buttonPlayPause = (ImageButton) findViewById(R.id.buttonPlayPause);
		buttonStop = (ImageButton) findViewById(R.id.buttonStop);
		textStatus = (TextView) findViewById(R.id.labelStatus);
		carImage = (ImageView) findViewById(R.id.imageCar);
		buttonPlayPause.setOnClickListener(this);
		buttonStop.setOnClickListener(this);
	}

	@Override
	protected void onResume() {
		super.onResume();
		mediaPlayer = MediaPlayer.create(getApplicationContext(), R.raw.fatiha);
		mediaPlayer.setLooping(false);
		mediaPlayer.setOnCompletionListener(this);
		this.textStatus.setText("Stopped");
	}

	@Override
	protected void onPause() {
		super.onPause();
		mediaPlayer.release();
		mediaPlayer = null;
		this.textStatus.setText("Stopped");
	}

	@Override
	public void onCompletion(MediaPlayer mPlayer) {
		this.buttonPlayPause.setImageResource(android.R.drawable.ic_media_play);
		this.carImage.setImageResource(cars[0]);
		this.textStatus.setText("Stopped");
	}

	@Override
	public void onClick(View view) {
		if (view.getId() == R.id.buttonPlayPause) {
			if (this.mediaPlayer.isPlaying()) {
				this.mediaPlayer.pause();
				this.buttonPlayPause.setImageResource(android.R.drawable.ic_media_play);
				this.carImage.setImageResource(cars[1]);
				this.textStatus.setText("Pause");
			} else {

				if (this.stopped) {
					mediaPlayer.reset();
					try {
						mediaPlayer.setDataSource(this.getResources().openRawResourceFd(R.raw.fatiha)
								.getFileDescriptor());
						mediaPlayer.prepare();
					} catch (Exception e) {
						e.printStackTrace();
					}
					this.stopped = false;
				}
				//
				this.mediaPlayer.start();
				this.buttonPlayPause.setImageResource(android.R.drawable.ic_media_pause);
				this.carImage.setImageResource(cars[2]);
				this.textStatus.setText("Playing");
			}

		} else if (view.getId() == R.id.buttonStop) {
			this.mediaPlayer.stop();
			this.stopped = true;
			this.buttonPlayPause.setImageResource(android.R.drawable.ic_media_play);
			this.carImage.setImageResource(cars[0]);
			this.textStatus.setText("Stopped");
		}
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		if (item.getItemId() == R.id.carA) {
			cars = carsA;
		} else if (item.getItemId() == R.id.carB) {
			cars = carsB;
		}
		this.carImage.setImageResource(cars[0]);
		return true;
	}
}
