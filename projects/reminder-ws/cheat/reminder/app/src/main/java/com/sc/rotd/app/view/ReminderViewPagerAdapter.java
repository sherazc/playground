package com.sc.rotd.app.view;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;
import com.sc.rotd.api.domain.AyaDetail;
import com.sc.rotd.app.ReminderFragment;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ReminderViewPagerAdapter extends FragmentStatePagerAdapter {

    private List<AyaDetail> ayaDetails;
    private Map<Integer, ReminderFragment> reminderFragments;

    public ReminderViewPagerAdapter(FragmentManager fragmentManager, List<AyaDetail> ayaDetails) {
        super(fragmentManager);
        this.ayaDetails = ayaDetails;
        reminderFragments = new HashMap<Integer, ReminderFragment>();
    }

    @Override
    public Fragment getItem(int position) {
        AyaDetail ayaDetail = ayaDetails.get(position);
        ReminderFragment reminderFragment = reminderFragments.get(ayaDetail.getSequenceNumberSeed());

        if (reminderFragment == null) {
            reminderFragment = new ReminderFragment();
            reminderFragments.put(ayaDetail.getSequenceNumberSeed(), reminderFragment);
        }
        reminderFragment.setAyaDetail(ayaDetail);
        return reminderFragment;
    }

    @Override
    public int getCount() {
        return ayaDetails.size();
    }
}
