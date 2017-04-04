package com.sc.android48_fragment.viewpager;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;
import com.sc.android48_fragment.app.R;

public class ViewPagerAdapter extends FragmentStatePagerAdapter {

    int[] images = {R.drawable.image1, R.drawable.image2, R.drawable.image3, R.drawable.image4,};

    public ViewPagerAdapter(FragmentManager fragmentManager) {
        super(fragmentManager);
    }

    @Override
    public Fragment getItem(int position) {
        return Fragment04a.newInstance(position, images[position]);
    }

    @Override
    public int getCount() {
        return images.length;
    }
}
