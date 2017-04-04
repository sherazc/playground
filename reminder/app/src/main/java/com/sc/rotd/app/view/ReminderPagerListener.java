package com.sc.rotd.app.view;

import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.ViewPager;
import com.sc.rotd.api.domain.AyaDetail;
import com.sc.rotd.app.ChapterNameFragment;
import com.sc.rotd.app.ReminderActivity;
import com.sc.rotd.app.R;

import java.util.List;

public class ReminderPagerListener implements ViewPager.OnPageChangeListener {

    private ReminderActivity activity;
    private List<AyaDetail> ayaDetails;
    //private int lastPosition;
    private PointerSelector pointerSelector;


    public ReminderPagerListener(ReminderActivity activity, List<AyaDetail> ayaDetails, PointerSelector pointerSelector) {
        this.activity = activity;
        this.ayaDetails = ayaDetails;
        this.pointerSelector = pointerSelector;
    }

    @Override
    public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
    }

    @Override
    public void onPageSelected(int position) {
        ChapterNameFragment chapterNameFragment = ChapterNameFragment.newInstance(ayaDetails.get(position));

        FragmentManager fragmentManager = activity.getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.setCustomAnimations(R.animator.chapter_name_in, R.animator.chapter_name_out);
        fragmentTransaction.replace(R.id.chapter_name_layout, chapterNameFragment,
                ChapterNameFragment.CHAPTER_NAME_FRAGMENT_NAME);
        fragmentTransaction.commit();
        //pointerSelector.select(lastPosition, false);
        pointerSelector.selectOne(position);
        //lastPosition = position;
    }

    @Override
    public void onPageScrollStateChanged(int state) {
    }


}
