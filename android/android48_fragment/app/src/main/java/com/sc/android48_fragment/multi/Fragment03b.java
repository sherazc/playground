package com.sc.android48_fragment.multi;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import com.sc.android48_fragment.app.R;

public class Fragment03b extends Fragment {

    public Fragment03b() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment03_b, container, false);
        return rootView;
    }
}
