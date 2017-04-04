package com.sc.ppevents;

import android.content.Context;
import android.view.Gravity;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;

public class LinearCenterImageView {
	
	private Context context;

	public LinearCenterImageView(Context context) {
		this.context = context;
	}
	
	
	public View createHorizontalCenterImageView(int resource, int imageWeight, int sidesWeight) {
		LinearLayout linearLayout = new LinearLayout(context);
		linearLayout.setOrientation(LinearLayout.HORIZONTAL);
		LinearLayout.LayoutParams linearLayoutLayoutParams = new LinearLayout.LayoutParams(
				FrameLayout.LayoutParams.MATCH_PARENT,
				FrameLayout.LayoutParams.WRAP_CONTENT);
		linearLayoutLayoutParams.gravity = Gravity.CENTER;
		linearLayout.setLayoutParams(linearLayoutLayoutParams);

		LinearLayout.LayoutParams leftRightViewLayoutParams = new LinearLayout.LayoutParams(
				FrameLayout.LayoutParams.MATCH_PARENT,
				FrameLayout.LayoutParams.WRAP_CONTENT);
		leftRightViewLayoutParams.weight = sidesWeight;
		ImageView leftTextView = new ImageView(context);
		leftTextView.setLayoutParams(leftRightViewLayoutParams);
		//leftTextView.setBackgroundColor(0xff00ff00);
		//leftTextView.setImageResource(R.drawable.stop_sign);
		linearLayout.addView(leftTextView);
		

		ImageView endImage = new ImageView(context);
		endImage.setImageResource(resource);
		LinearLayout.LayoutParams endImageLayoutParams = new LinearLayout.LayoutParams(
				FrameLayout.LayoutParams.MATCH_PARENT,
				FrameLayout.LayoutParams.WRAP_CONTENT);
		endImageLayoutParams.weight = imageWeight;
		endImage.setLayoutParams(endImageLayoutParams);
		linearLayout.addView(endImage);

		ImageView rightTextView = new ImageView(context);
		rightTextView.setLayoutParams(leftRightViewLayoutParams);
		//rightTextView.setBackgroundColor(0xffff0000);
		//rightTextView.setImageResource(R.drawable.stop_sign);
		linearLayout.addView(rightTextView);
		return linearLayout;

	}
}
