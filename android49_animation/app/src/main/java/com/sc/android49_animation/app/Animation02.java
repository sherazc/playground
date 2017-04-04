package com.sc.android49_animation.app;

import android.animation.*;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;


public class Animation02 extends ActionBarActivity {

    private CheckBox checkBox;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.animation02_property);


        checkBox = (CheckBox) findViewById(R.id.checkBox_anim02);
        Button btnAlpha = (Button) findViewById(R.id.button_anim02_alpha);
        Button btnTranslate = (Button) findViewById(R.id.button_anim02_translate);
        Button btnRotate = (Button) findViewById(R.id.button_anim02_rotate);
        Button btnScale = (Button) findViewById(R.id.button_anim02_scale);
        Button btnSet = (Button) findViewById(R.id.button_anim02_set);

        ObjectAnimator alphaAnimator = ObjectAnimator.ofFloat(btnAlpha, View.ALPHA, 0);
        alphaAnimator.setRepeatCount(5);
        alphaAnimator.setRepeatMode(ValueAnimator.REVERSE);

        ObjectAnimator translateAnimator = ObjectAnimator.ofFloat(btnTranslate, View.TRANSLATION_X, 400);
        translateAnimator.setRepeatCount(5);
        translateAnimator.setRepeatMode(ValueAnimator.REVERSE);

        ObjectAnimator rotateAnimator = ObjectAnimator.ofFloat(btnRotate, View.ROTATION, 360);
        rotateAnimator.setRepeatCount(5);
        rotateAnimator.setRepeatMode(ValueAnimator.REVERSE);

        PropertyValuesHolder pvhScaleX = PropertyValuesHolder.ofFloat(View.SCALE_X, 5);
        PropertyValuesHolder pvhScaleY = PropertyValuesHolder.ofFloat(View.SCALE_Y, 5);

        ObjectAnimator scaleAnimator = ObjectAnimator.ofPropertyValuesHolder(btnScale, pvhScaleX, pvhScaleY);
        scaleAnimator.setRepeatCount(5);
        scaleAnimator.setRepeatMode(ValueAnimator.REVERSE);

        AnimatorSet animatorSet = new AnimatorSet();
        animatorSet.play(translateAnimator).after(alphaAnimator).before(rotateAnimator);
        animatorSet.play(rotateAnimator).before(scaleAnimator);


        setupAnimation(btnAlpha, alphaAnimator, R.animator.alpha_fade);
        setupAnimation(btnTranslate, translateAnimator, R.animator.translate_move);
        setupAnimation(btnRotate, rotateAnimator, R.animator.spin);
        setupAnimation(btnScale, scaleAnimator, R.animator.scale);
        setupAnimation(btnSet, animatorSet, R.animator.combo);
    }

    private void setupAnimation(View view, final Animator animator, final int animResourceId) {
        // by default duration is 300 milli seconds
        //animator.setDuration(2000);
        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (checkBox.isChecked()) {
                    Animator anim = AnimatorInflater.loadAnimator(Animation02.this, animResourceId);
                    anim.setTarget(v);
                    anim.start();
                } else {
                    animator.start();
                }
            }
        });
    }
}
