package com.sc.ppevents;

import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.graphics.Typeface;
import android.view.Gravity;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

public class IntroPageHandler {

	private Activity context;

	public IntroPageHandler(Activity context) {
		this.context = context;
	}

	public List<View> createIntroViews() {
		List<View> views = new ArrayList<View>();
		views.add(createDisclaimerPage());
		return views;
	}

	private View createDisclaimerPage() {
		FrameLayout frameLayout = new FrameLayout(context);

		LinearLayout linearLayout = new LinearLayout(context);
		linearLayout.setOrientation(LinearLayout.VERTICAL);

		FrameLayout.LayoutParams linearLayoutLayoutParams = new FrameLayout.LayoutParams(
				android.widget.FrameLayout.LayoutParams.MATCH_PARENT,
				android.widget.FrameLayout.LayoutParams.WRAP_CONTENT);
		linearLayoutLayoutParams.gravity = Gravity.CENTER;

		linearLayout.setLayoutParams(linearLayoutLayoutParams);
		ImageView stopImageView = new ImageView(context);
		stopImageView.setImageResource(R.drawable.stop_sign);

		int screenWidth = context.getWindowManager().getDefaultDisplay().getWidth();
		int stopImageWidth = screenWidth / 4;

		LinearLayout.LayoutParams stopImageViewLayoutParams = new LinearLayout.LayoutParams(stopImageWidth,
				stopImageWidth);
		stopImageViewLayoutParams.gravity = Gravity.CENTER;
		stopImageViewLayoutParams.bottomMargin = 10;
		stopImageView.setLayoutParams(stopImageViewLayoutParams);

		TextView headerTextView = new TextView(context);
		headerTextView.setPadding(30, 0, 0, 30);
		headerTextView.setText("Disclaimer");
		headerTextView.setTextSize(20);
		headerTextView.setTypeface(null, Typeface.BOLD);
		headerTextView.setGravity(Gravity.CENTER);
		headerTextView.setTextColor(0xff17395c);

		linearLayout.addView(stopImageView);
		linearLayout.addView(headerTextView);

		TextView disclamerTextView = new TextView(context);
		disclamerTextView.setTextSize(12);
		disclamerTextView.setTypeface(null, Typeface.ITALIC);
		disclamerTextView.setGravity(Gravity.CENTER);

		disclamerTextView
				.setText("This information is composed to the best of our research. It\'s advised that you should do your own research. In case of any conflicts in information please email the developer.\nAllah knows best.");

		linearLayout.addView(disclamerTextView);

		frameLayout.addView(linearLayout);
		return frameLayout;
	}

}
