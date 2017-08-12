package com.sc.android;

import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Paint;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

public class MainActivity extends Activity {

	//http://www.vogella.com/articles/AndroidAnimation/article.html
		
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
	}

	public void startAnimation(View view) {
		float dest = 0;
		ImageView aniView = (ImageView) findViewById(R.id.imageView1);

		switch (view.getId()) {
		case R.id.Button01:
			dest = 360;
			if (aniView.getRotation() == 360) {
				System.out.println(aniView.getAlpha());
				dest = 0;
			}
			ObjectAnimator animation1 = ObjectAnimator.ofFloat(aniView, "rotation", dest);
			animation1.setDuration(2000);
			animation1.start();
			break;
		case R.id.Button02:
			Paint paint = new Paint();
			TextView aniTextView = (TextView) findViewById(R.id.textView1);
			float measureTextCenter = paint.measureText(aniTextView.getText().toString());
			dest = 0 - measureTextCenter;
			if (aniTextView.getX() < 0) {
				dest = 0;
			}
			ObjectAnimator animation2 = ObjectAnimator.ofFloat(aniTextView, "x", dest);
			animation2.setDuration(2000);
			animation2.start();
			break;
		case R.id.Button03:
			dest = 1;
			if (aniView.getAlpha() > 0) {
				dest = 0;
			}
			ObjectAnimator animation3 = ObjectAnimator.ofFloat(aniView, "alpha", dest);
			animation3.setDuration(2000);
			animation3.start();
			break;
		case R.id.Button04:
			ObjectAnimator fadeOut = ObjectAnimator.ofFloat(aniView, "alipa", 0f);
			fadeOut.setDuration(2000);

			ObjectAnimator mover = ObjectAnimator.ofFloat(aniView, "traslationX", -500f, 0f);
			mover.setDuration(2000);

			ObjectAnimator fadeIn = ObjectAnimator.ofFloat(aniView, "alpha", 0f, 1f);
			fadeIn.setDuration(2000);

			AnimatorSet animatorSet = new AnimatorSet();

			animatorSet.play(mover).with(fadeIn).after(fadeOut);
			animatorSet.start();
			break;
		default:
			break;
		}

	}
	
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.main, menu);
		return super.onCreateOptionsMenu(menu);
	}
	
	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		Intent intent = new Intent(this, HitActivity.class);
		startActivity(intent);
		return true;
	}
}