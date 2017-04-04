package com.sc.android49_animation.app;

import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.View;
import android.view.animation.*;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.Toast;


public class Animation01 extends ActionBarActivity {

    private CheckBox cbUseAmiResource;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.animation01);

        cbUseAmiResource = (CheckBox) findViewById(R.id.checkbox_anim01);
        Button btnAlpha = (Button) findViewById(R.id.button_anim01_alpha);
        Button btnTranslate = (Button) findViewById(R.id.button_anim01_translate);
        Button btnRotate = (Button) findViewById(R.id.button_anim01_rotate);
        Button btnScale = (Button) findViewById(R.id.button_anim01_scale);
        Button btnSet = (Button) findViewById(R.id.button_anim01_set);

        final AlphaAnimation alphaAnimation = new AlphaAnimation(1, 0);
        alphaAnimation.setDuration(1000);

        final TranslateAnimation translateAnimation =
                new TranslateAnimation(Animation.ABSOLUTE, 0,
                        Animation.RELATIVE_TO_PARENT, 1,
                        Animation.ABSOLUTE, 0,
                        Animation.ABSOLUTE, 100);
        translateAnimation.setDuration(1000);

        final RotateAnimation rotateAnimation = new RotateAnimation(
                0, 360,
                Animation.RELATIVE_TO_SELF, 0.5f,
                Animation.RELATIVE_TO_SELF, 0.5f);
        rotateAnimation.setDuration(1000);

        final ScaleAnimation scaleAnimation = new ScaleAnimation(1, 2, 1, 2);
        scaleAnimation.setDuration(1000);

        final AnimationSet animationSet = new AnimationSet(true);
        animationSet.addAnimation(alphaAnimation);
        animationSet.addAnimation(translateAnimation);
        animationSet.addAnimation(rotateAnimation);
        animationSet.addAnimation(scaleAnimation);

        setupAnimation(btnAlpha, alphaAnimation, R.anim.alpha_animation);
        setupAnimation(btnTranslate, translateAnimation, R.anim.translate_animation);
        setupAnimation(btnRotate, rotateAnimation, R.anim.rotate_animation);
        setupAnimation(btnScale, scaleAnimation, R.anim.scale_animation);
        setupAnimation(btnSet, animationSet, R.anim.set_animation);
    }

    private void setupAnimation(View view, final Animation animation, final int animationResourceId) {

        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (cbUseAmiResource.isChecked()) {
                    Toast.makeText(Animation01.this, "Resources Animation.", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(Animation01.this, "Java Animation.", Toast.LENGTH_SHORT).show();
                }

                v.startAnimation(cbUseAmiResource.isChecked() ? AnimationUtils.loadAnimation(
                        Animation01.this, animationResourceId) : animation);
            }
        });
    }
}
