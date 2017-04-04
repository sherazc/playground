package com.sc.android12;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ImageView;

/**
 * Read these:
 * http://developer.android.com/guide/topics/resources/drawable-resource.html
 * http://developer.android.com/guide/practices/screens_support.html
 * 
 * @author schaudhry2
 *
 */
public class MainActivity extends Activity {

	private int currentImageId = 1;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		// requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.main);
		addListenerOnButton();
	}

	private void addListenerOnButton() {
		final ImageView image = (ImageView) findViewById(R.id.imageView1);
		Button button = (Button) findViewById(R.id.buttonChangeImage);

		button.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				if (currentImageId == 1) {
					currentImageId = 2;
					// image.setImageResource(R.drawable.image2);
					image.setImageDrawable(getResources().getDrawable(R.drawable.image2));
				} else if (currentImageId == 2) {
					currentImageId = 3;
					// image.setImageResource(R.drawable.image3);
					image.setImageDrawable(getResources().getDrawable(R.drawable.image3));
				} else if (currentImageId == 3) {
					currentImageId = 1;
					// image.setImageResource(R.drawable.image1);
					image.setImageDrawable(getResources().getDrawable(R.drawable.image1));
				}
			}
		});
	}
}