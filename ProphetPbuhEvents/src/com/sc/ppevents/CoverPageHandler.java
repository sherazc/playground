package com.sc.ppevents;

import com.sc.ppevents.listner.JumPageOnClickListener;
import com.sc.ppevents.view.RealViewSwitcher;

import android.content.Context;
import android.graphics.Typeface;
import android.view.Gravity;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.SeekBar;
import android.widget.TextView;

public class CoverPageHandler {

	private Context context;
	private SeekBar seekBar;
	private RealViewSwitcher realViewSwitcher;

	public CoverPageHandler(Context context) {
		this.context = context;
	}

	public View createTilePage() {
		LinearLayout mainTitleView = new LinearLayout(context);
		mainTitleView.setOrientation(LinearLayout.VERTICAL);
		LinearLayout.LayoutParams layoutParam = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.FILL_PARENT,
				LinearLayout.LayoutParams.FILL_PARENT);
		mainTitleView.setLayoutParams(layoutParam);
		mainTitleView.setBackgroundResource(R.drawable.title_screen_top_background);

		LinearLayout topView = createTitleTopView();
		LinearLayout bottomView = createTitleBottomView();

		mainTitleView.addView(topView);
		mainTitleView.addView(bottomView);

		return mainTitleView;

	}

	private LinearLayout createTitleBottomView() {
		LinearLayout bottomView = new LinearLayout(context);
		LinearLayout.LayoutParams bottomViewLayoutParam = new LinearLayout.LayoutParams(
				LinearLayout.LayoutParams.FILL_PARENT, LinearLayout.LayoutParams.FILL_PARENT);
		bottomViewLayoutParam.weight = 50;
		bottomView.setOrientation(LinearLayout.VERTICAL);
		bottomView.setLayoutParams(bottomViewLayoutParam);
		bottomView.setBackgroundResource(R.drawable.title_screen_bottom_background);

		LinearLayout buttonRow1 = createJumpButtonLayout();
		bottomView.addView(buttonRow1);
		LinearLayout buttonRow2 = createJumpButtonLayout();
		bottomView.addView(buttonRow2);

		ImageButton buttonTheEarlyYears = createJumpButton(R.drawable.the_early_years);
		buttonRow1.addView(buttonTheEarlyYears);
		ImageButton buttonProphethood = createJumpButton(R.drawable.prophethood);
		buttonRow1.addView(buttonProphethood);
		
		ImageButton buttonHijrah = createJumpButton(R.drawable.hijrah);
		buttonRow2.addView(buttonHijrah);
		ImageButton buttonLaterYears = createJumpButton(R.drawable.the_later_years);
		buttonRow2.addView(buttonLaterYears);
		
		
		buttonTheEarlyYears.setOnClickListener(new JumPageOnClickListener(1, seekBar, realViewSwitcher));
		buttonProphethood.setOnClickListener(new JumPageOnClickListener(16, seekBar, realViewSwitcher));
		buttonHijrah.setOnClickListener(new JumPageOnClickListener(30, seekBar, realViewSwitcher));
		buttonLaterYears.setOnClickListener(new JumPageOnClickListener(91, seekBar, realViewSwitcher));

		return bottomView;
	}

	private LinearLayout createJumpButtonLayout() {
		LinearLayout buttonRow1 = new LinearLayout(context);
		LinearLayout.LayoutParams buttonRow1LayoutParam = new LinearLayout.LayoutParams(
				LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
		buttonRow1LayoutParam.gravity = Gravity.CENTER;
		buttonRow1LayoutParam.setMargins(5, 5, 5, 5);
		buttonRow1.setOrientation(LinearLayout.HORIZONTAL);
		buttonRow1.setLayoutParams(buttonRow1LayoutParam);
		return buttonRow1;
	}

	private ImageButton createJumpButton(int imageResource) {
		ImageButton button = new ImageButton(context);
		LinearLayout.LayoutParams buttonLayoutParam = new LinearLayout.LayoutParams(
				LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
		buttonLayoutParam.weight = 5;
		buttonLayoutParam.setMargins(5, 5, 5, 5);
		button.setBackgroundResource(imageResource);
		button.setLayoutParams(buttonLayoutParam);
		return button;
	}

	private LinearLayout createTitleTopView() {
		LinearLayout topView = new LinearLayout(context);
		LinearLayout.LayoutParams topViewLayoutParam = new LinearLayout.LayoutParams(
				LinearLayout.LayoutParams.FILL_PARENT, LinearLayout.LayoutParams.FILL_PARENT);
		topViewLayoutParam.weight = 50;
		topView.setOrientation(LinearLayout.VERTICAL);
		topView.setLayoutParams(topViewLayoutParam);
		// topView.setBackgroundColor(0xffeed20f);

		LinearLayout textViewBlank1 = new LinearLayout(context);
		LinearLayout.LayoutParams blank1ViewLayoutParam = new LinearLayout.LayoutParams(
				LinearLayout.LayoutParams.FILL_PARENT, LinearLayout.LayoutParams.FILL_PARENT);
		blank1ViewLayoutParam.weight = 80;
		textViewBlank1.setLayoutParams(blank1ViewLayoutParam);
		topView.addView(textViewBlank1);

		LinearLayout topContentView = new LinearLayout(context);
		LinearLayout.LayoutParams topContentViewLayoutParam = new LinearLayout.LayoutParams(
				LinearLayout.LayoutParams.FILL_PARENT, LinearLayout.LayoutParams.FILL_PARENT);
		topContentView.setOrientation(LinearLayout.VERTICAL);
		topContentViewLayoutParam.weight = 30;
		topContentView.setLayoutParams(topContentViewLayoutParam);

		topView.addView(topContentView);

		LinearLayout textViewBlank2 = new LinearLayout(context);
		LinearLayout.LayoutParams blank2ViewLayoutParam = new LinearLayout.LayoutParams(
				LinearLayout.LayoutParams.FILL_PARENT, LinearLayout.LayoutParams.FILL_PARENT);
		blank2ViewLayoutParam.weight = 80;
		textViewBlank2.setLayoutParams(blank1ViewLayoutParam);
		topView.addView(textViewBlank2);

		TextView title1 = new TextView(context);
		title1.setTextSize(25);
		title1.setText("Chronology of the Life of\nProphet Muhammad");
		title1.setGravity(Gravity.CENTER);
		title1.setTypeface(null, Typeface.BOLD);
		LinearLayout.LayoutParams title1LayoutParam = new LinearLayout.LayoutParams(
				LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
		title1LayoutParam.gravity = Gravity.CENTER;
		title1LayoutParam.weight = 2;
		title1.setLayoutParams(title1LayoutParam);
		topContentView.addView(title1);

		ImageView imageViewPbuh = new ImageView(context);
		imageViewPbuh.setImageResource(R.drawable.pbuh);
		LinearLayout.LayoutParams imageViewLayoutParams = new LinearLayout.LayoutParams(
				LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
		imageViewLayoutParams.gravity = Gravity.CENTER;
		imageViewLayoutParams.weight = 80;
		imageViewPbuh.setLayoutParams(imageViewLayoutParams);
		// imageViewPbuh.setPadding(0, 0, 0, 0);
		topContentView.addView(imageViewPbuh);

		ImageView imageViewRedLine = new ImageView(context);
		imageViewRedLine.setImageResource(R.drawable.thick_red_line);
		LinearLayout.LayoutParams imageViewRedLineLayoutParams = new LinearLayout.LayoutParams(
				LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
		imageViewRedLineLayoutParams.gravity = Gravity.CENTER;
		imageViewRedLine.setLayoutParams(imageViewRedLineLayoutParams);
		imageViewRedLine.setPadding(10, 10, 10, 10);
		topContentView.addView(imageViewRedLine);
		return topView;
	}

	public View createTitlePage() {

		LinearLayout linearLayout = new LinearLayout(context);
		linearLayout.setOrientation(LinearLayout.VERTICAL);
		LinearLayout.LayoutParams layoutParam = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.FILL_PARENT,
				LinearLayout.LayoutParams.FILL_PARENT);
		linearLayout.setLayoutParams(layoutParam);
		linearLayout.setBackgroundResource(R.drawable.title_screen_top_background);

		TextView title1 = new TextView(context);
		title1.setTextSize(25);
		title1.setText("Chronology of the Life of\nProphet Muhammad");
		title1.setGravity(Gravity.CENTER);
		title1.setTypeface(null, Typeface.BOLD);
		title1.setPadding(20, 70, 20, 0);

		LinearLayout linearLayoutBottom = new LinearLayout(context);
		LinearLayout.LayoutParams layoutParamBottom = new LinearLayout.LayoutParams(
				LinearLayout.LayoutParams.FILL_PARENT, LinearLayout.LayoutParams.FILL_PARENT);
		linearLayoutBottom.setLayoutParams(layoutParamBottom);
		// linearLayoutBottom.setBackgroundResource(R.drawable.blue_leather_pattern);
		linearLayoutBottom.setBackgroundResource(R.drawable.title_screen_bottom_background);
		linearLayoutBottom.setOrientation(LinearLayout.VERTICAL);
		TextView title2 = new TextView(context);
		title2.setTextColor(0xffffffff);
		title2.setTextSize(18);
		title2.setText("Test Text");
		title2.setGravity(Gravity.CENTER);
		title2.setTypeface(null, Typeface.BOLD);
		title2.setPadding(20, 20, 20, 0);
		linearLayoutBottom.addView(title2);

		ImageView imageViewPbuh = new ImageView(context);
		imageViewPbuh.setImageResource(R.drawable.pbuh);
		LinearLayout.LayoutParams imageViewLayoutParams = new LinearLayout.LayoutParams(70, 70);
		imageViewLayoutParams.gravity = Gravity.CENTER;
		imageViewPbuh.setLayoutParams(imageViewLayoutParams);
		imageViewPbuh.setPadding(0, 0, 0, 0);

		ImageView imageViewRedLine = new ImageView(context);
		imageViewRedLine.setImageResource(R.drawable.thick_red_line);
		LinearLayout.LayoutParams imageViewRedLineLayoutParams = new LinearLayout.LayoutParams(
				LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
		imageViewRedLineLayoutParams.gravity = Gravity.CENTER;
		imageViewRedLine.setLayoutParams(imageViewRedLineLayoutParams);
		imageViewRedLine.setPadding(50, 0, 50, 30);

		linearLayout.addView(title1);
		linearLayout.addView(imageViewPbuh);
		linearLayout.addView(imageViewRedLine);
		linearLayout.addView(linearLayoutBottom);
		return linearLayout;
	}

	public SeekBar getSeekBar() {
		return seekBar;
	}

	public void setSeekBar(SeekBar seekBar) {
		this.seekBar = seekBar;
	}

	public RealViewSwitcher getRealViewSwitcher() {
		return realViewSwitcher;
	}

	public void setRealViewSwitcher(RealViewSwitcher realViewSwitcher) {
		this.realViewSwitcher = realViewSwitcher;
	}

}
