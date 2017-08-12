package com.sc.android48_fragment.app;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.View;
import com.sc.android48_fragment.fragmentwithdrawer.Fragment05MenuDrawer;
import com.sc.android48_fragment.multi.Fragment03Multi;
import com.sc.android48_fragment.viewpager.Fragment04ViewPager;

public class MainActivity extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void startFragment01(View view) {
        Intent intent = new Intent(this, Fragment01.class);
        startActivity(intent);
    }

    public void startFragment02(View view) {
        Intent intent = new Intent(this, Fragment02.class);
        startActivity(intent);
    }

    public void startMultipleFragment(View view) {
        Intent intent = new Intent(this, Fragment03Multi.class);
        startActivity(intent);
    }

    public void startViewPager(View view) {
        Intent intent = new Intent(this, Fragment04ViewPager.class);
        startActivity(intent);
    }

    public void startFragmentMenuDrawer(View view) {
        Intent intent = new Intent(this, Fragment05MenuDrawer.class);
        startActivity(intent);
    }


}
