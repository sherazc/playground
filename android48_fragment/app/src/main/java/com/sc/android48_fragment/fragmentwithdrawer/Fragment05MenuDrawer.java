package com.sc.android48_fragment.fragmentwithdrawer;

import android.support.v7.app.ActionBarActivity;
import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.sc.android48_fragment.app.R;
import net.simonvt.menudrawer.MenuDrawer;


// https://github.com/SimonVT/android-menudrawer
// https://www.youtube.com/watch?v=iJ178Z8U7FM
public class Fragment05MenuDrawer extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        // instead of setting main activity view layout, we will set it in menu drawer content
        //setContentView(R.layout.fragment05);

        MenuDrawer menuDrawer = MenuDrawer.attach(this);
        menuDrawer.setMenuView(R.layout.fragment05_b_drawer);
        menuDrawer.setContentView(R.layout.fragment05);


        if (savedInstanceState == null) {
            getSupportFragmentManager().beginTransaction()
                    .add(R.id.fragment05_container, new PlaceholderFragment())
                    .commit();
        }
    }

    /**
     * A placeholder fragment containing a simple view.
     */
    public static class PlaceholderFragment extends Fragment {

        public PlaceholderFragment() {
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {
            View rootView = inflater.inflate(R.layout.fragment05_a, container, false);
            return rootView;
        }
    }
}
