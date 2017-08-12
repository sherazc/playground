package com.sc.android50_anim_loading_screen.app;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.NavUtils;
import android.support.v7.app.ActionBarActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;


public class Activity01CrossFadeViews extends ActionBarActivity {

    private boolean contentLoaded;
    private View contentView;
    private View loadingView;

    private int shortAnimationDuration;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activiti01);
        contentView = findViewById(R.id.activity01_content);
        loadingView = findViewById(R.id.activity01_loading);

        contentView.setVisibility(View.GONE);

        shortAnimationDuration = 2000;
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activiti01_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.activity01_action_toggle:
                contentLoaded = !contentLoaded;
                showContentOrLoadingView(contentLoaded);
                break;
            case android.R.id.home:
                NavUtils.navigateUpTo(this, new Intent(this, MainActivity.class));
                break;
        }

        return super.onOptionsItemSelected(item);
    }

    private void showContentOrLoadingView(boolean cLoaded) {
        final View showView = cLoaded ? contentView : loadingView;
        final View hideView = cLoaded ? loadingView : contentView;


        showView.setAlpha(0f);
        showView.setVisibility(View.VISIBLE);


        showView.animate()
                .alpha(1f)
                .setDuration(shortAnimationDuration)
                .setListener(null);


        hideView.animate()
                .alpha(0f)
                .setDuration(shortAnimationDuration)
                .setListener(new AnimatorListenerAdapter() {
                    @Override
                    public void onAnimationEnd(Animator animation) {
                        hideView.setVisibility(View.GONE);
                    }
                });
    }
}
