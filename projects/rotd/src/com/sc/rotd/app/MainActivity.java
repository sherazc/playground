package com.sc.rotd.app;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import com.sc.domain.AyaDetail;
import com.sc.rotd.app.service.SearchServiceAndroid;
import com.sc.service.SearchService;

import java.util.List;

public class MainActivity extends Activity {

    public static final int LOADING_FLIP_ANIMATION_DURATION = 500;
    private View mainLoadingView;
    private View mainContentView;

    private SearchService searchService;



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);


/*

        mainContentView = findViewById(R.id.main_content_view);
        mainLoadingView = findViewById(R.id.main_loading_view);

        mainContentView.setVisibility(View.GONE);

        ContentLoadAsyncTask contentLoadAsyncTask = new ContentLoadAsyncTask(this, getSearchService());
        contentLoadAsyncTask.execute((Object[]) null);
*/

    }

    private SearchService getSearchService() {
        if (searchService == null) {
            searchService = new SearchServiceAndroid(this);
        }
        return searchService;
    }


    public void showContentView() {
        mainContentView.setAlpha(0f);
        mainContentView.setVisibility(View.VISIBLE);

        mainContentView.animate()
                .alpha(1f)
                .setDuration(LOADING_FLIP_ANIMATION_DURATION)
                .setListener(null);


        mainLoadingView.animate()
                .alpha(0f)
                .setDuration(LOADING_FLIP_ANIMATION_DURATION)
                .setListener(new AnimatorListenerAdapter() {
                    @Override
                    public void onAnimationEnd(Animator animation) {
                        mainLoadingView.setVisibility(View.GONE);
                    }
                });
    }

    public void refreshAyaDetails(List<AyaDetail> ayaDetails) {
        TextView ayaDetailsView = (TextView) findViewById(R.id.text_view_aya);
        ayaDetailsView.setText(ayaDetails.get(0).combineAllAyaLines());

        TextView translationDetailsView = (TextView) findViewById(R.id.text_view_translation);
        translationDetailsView.setText(ayaDetails.get(0).combineAllTranslationLines());

    }
}
