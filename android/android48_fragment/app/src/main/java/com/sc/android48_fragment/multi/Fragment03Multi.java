package com.sc.android48_fragment.multi;

import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import com.sc.android48_fragment.app.R;

public class Fragment03Multi extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fragment03);
        if (savedInstanceState == null) {
            getSupportFragmentManager().beginTransaction()
                    .add(R.id.fragment03_menu_container, new Fragment03MultiMenu())
                    .commit();
        }
    }

}
