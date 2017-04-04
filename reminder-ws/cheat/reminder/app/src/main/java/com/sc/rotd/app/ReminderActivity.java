package com.sc.rotd.app;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.ViewPager;
import android.support.v7.app.ActionBarActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import com.sc.rotd.api.domain.AyaDetail;
import com.sc.rotd.app.helper.ReminderActivityHelper;
import com.sc.rotd.app.persistence.SharedPreferencesManager;
import com.sc.rotd.app.service.SearchServiceAndroid;
import com.sc.rotd.app.utils.CommonAndroidUtils;
import com.sc.rotd.app.view.PointerSelector;
import com.sc.rotd.app.view.ReminderPagerListener;
import com.sc.rotd.app.view.ReminderViewPagerAdapter;
import com.sc.rotd.app.view.TranslationDialogFragment;

import java.util.List;

public class ReminderActivity extends ActionBarActivity {

    public static final int LOADING_FLIP_ANIMATION_DURATION = 250;
    private View mainLoadingView;
    private View mainContentView;
    private PointerSelector pointerSelector;
    private List<AyaDetail> ayaDetails;
    private ReminderPagerListener reminderPagerListener;
    private ViewPager viewPager;
    private ReminderActivityHelper reminderActivityHelper;
    private SharedPreferencesManager sharedPreferencesManager;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        reminderActivityHelper = new ReminderActivityHelper(this);
        setContentView(R.layout.activity_reminder);
        sharedPreferencesManager = new SharedPreferencesManager(this);
        pointerSelector = new PointerSelector(this, R.id.page_pointer_layout);
        mainContentView = findViewById(R.id.main_content_view);
        mainLoadingView = findViewById(R.id.main_loading_view);

        viewPager = (ViewPager) findViewById(R.id.reminder_view_pager);
        reminderActivityHelper.loadToolbar();
        reminderActivityHelper.loadTranslationSpinner();
        reminderActivityHelper.loadChapterNameFragment();
        mainContentView.setVisibility(View.GONE);
        searchInBackground();
    }

    TranslationDialogFragment newFragment;

    public void showTranslationDialogFragment(View view) {
        FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();
        Fragment previousFragment = getSupportFragmentManager().findFragmentByTag(TranslationDialogFragment.ID);
        if (previousFragment != null) {
            fragmentTransaction.remove(previousFragment);
        }
        fragmentTransaction.addToBackStack(null);

        newFragment = TranslationDialogFragment.newInstance();
        newFragment.show(fragmentTransaction, TranslationDialogFragment.ID);
    }

    private void searchInBackground() {
        String selectedTranslationName = CommonAndroidUtils.translationNameFromSPM(sharedPreferencesManager);

        ContentLoadAsyncTask contentLoadAsyncTask = new ContentLoadAsyncTask(this,
                SearchServiceAndroid.buildSearchService(this, selectedTranslationName));
        contentLoadAsyncTask.execute((Object[]) null);
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
        this.setAyaDetails(ayaDetails);
        FragmentManager fragmentManager = getSupportFragmentManager();

        // Make this work
        // reminderActivityHelper.readValidTheLastSavedPage(ayaDetails);
//        int currentPageNumber = viewPager.getCurrentItem();
        int currentPageNumber = reminderActivityHelper.readValidTheLastSavedPage(ayaDetails);
        ;
        viewPager.setOnPageChangeListener(null);

        ReminderViewPagerAdapter reminderViewPagerAdapter = new ReminderViewPagerAdapter(fragmentManager,
                ayaDetails);
        viewPager.setAdapter(reminderViewPagerAdapter);
        viewPager.setCurrentItem(currentPageNumber);
        reminderActivityHelper.populateChapterNameFragment(ayaDetails, currentPageNumber);
        if (getReminderPagerListener() == null) {
            this.setReminderPagerListener(new ReminderPagerListener(this, ayaDetails, pointerSelector));
        }
        viewPager.setOnPageChangeListener(getReminderPagerListener());
        pointerSelector.addDefaultPointers(ayaDetails.size());
        pointerSelector.selectOne(currentPageNumber);
    }

    @Override
    protected void onPause() {
        super.onPause();
        sharedPreferencesManager.saveIntValue(ReminderActivityHelper.SAVED_AYA_DETAIL_SEQUENCE_NUMBER_SEED,
                reminderActivityHelper.getFirstAyaDetailSequenceNumberSeed(getAyaDetails()));
        sharedPreferencesManager.saveIntValue(ReminderActivityHelper.SAVED_PAGE, viewPager.getCurrentItem());
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.reminder_toolbar_settings) {
            startActivity(new Intent(this, SettingsActivity.class));
            return true;
        } else if (id == R.id.reminder_toolbar_share) {
            reminderActivityHelper.shareCurrentSelectedAya();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }


    public List<AyaDetail> getAyaDetails() {
        return ayaDetails;
    }

    public void setAyaDetails(List<AyaDetail> ayaDetails) {
        this.ayaDetails = ayaDetails;
    }

    public ReminderPagerListener getReminderPagerListener() {
        return reminderPagerListener;
    }

    public void setReminderPagerListener(ReminderPagerListener reminderPagerListener) {
        this.reminderPagerListener = reminderPagerListener;
    }

    public ViewPager getViewPager() {
        return viewPager;
    }

    public SharedPreferencesManager getSharedPreferencesManager() {
        return sharedPreferencesManager;
    }

    public void setSharedPreferencesManager(SharedPreferencesManager sharedPreferencesManager) {
        this.sharedPreferencesManager = sharedPreferencesManager;
    }
}
