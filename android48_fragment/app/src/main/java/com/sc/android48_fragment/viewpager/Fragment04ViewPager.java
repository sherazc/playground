package com.sc.android48_fragment.viewpager;

import android.os.Bundle;
import android.support.v4.view.ViewPager;
import android.support.v7.app.ActionBarActivity;
import com.sc.android48_fragment.app.R;

public class Fragment04ViewPager extends ActionBarActivity {

    private ViewPager viewPager;
    private ViewPagerAdapter viewPagerAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fragment04_view_pager);

        viewPager = (ViewPager) findViewById(R.id.fragment04_view_pager);

        viewPagerAdapter = new ViewPagerAdapter(getSupportFragmentManager());
        viewPager.setAdapter(viewPagerAdapter);


    }
}
