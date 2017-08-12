package com.sc.android11;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.Button;
import android.widget.RatingBar;
import android.widget.RatingBar.OnRatingBarChangeListener;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends Activity {

	private RatingBar ratingBar;
	private TextView txtRatingValue;
	private Button buttonSubmit;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.main);
		addListenerOnButton();
		addListenerOnRatingBar();
	}

	private void addListenerOnRatingBar() {
		ratingBar = (RatingBar) findViewById(R.id.ratingBar);
		txtRatingValue = (TextView) findViewById(R.id.txtRatingValue);

		ratingBar.setOnRatingBarChangeListener(new OnRatingBarChangeListener() {

			@Override
			public void onRatingChanged(RatingBar ratingBar, float rating, boolean fromUser) {
				txtRatingValue.setText(String.valueOf(rating));
			}
		});
	}

	private void addListenerOnButton() {
		ratingBar = (RatingBar) findViewById(R.id.ratingBar);
		buttonSubmit = (Button) findViewById(R.id.buttonSubmit);

		buttonSubmit.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				Toast.makeText(MainActivity.this, String.valueOf(ratingBar.getRating()), Toast.LENGTH_SHORT).show();

			}
		});
	}
}