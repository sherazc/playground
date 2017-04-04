package com.sc.android48_fragment.multi;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.Toast;
import com.sc.android48_fragment.app.R;

public class Fragment03c extends Fragment {

    public Fragment03c() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment03_c, container, false);

        final CheckBox checkBox = (CheckBox) rootView.findViewById(R.id.frag_multi_c_checkbox);

        ((Button) rootView.findViewById(R.id.frag_multi_c_ok_button)).setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                Toast.makeText(getActivity(), "Checked = " + checkBox.isChecked(), Toast.LENGTH_LONG).show();
            }

        });
        return rootView;
    }
}
