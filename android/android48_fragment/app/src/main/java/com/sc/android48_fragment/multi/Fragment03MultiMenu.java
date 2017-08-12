package com.sc.android48_fragment.multi;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import com.sc.android48_fragment.app.R;

public class Fragment03MultiMenu extends Fragment {

    public Fragment03MultiMenu() {
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        Fragment fragment03a = new Fragment03a();
        FragmentTransaction fragmentTransaction = getFragmentManager().beginTransaction();
        fragmentTransaction.add(R.id.fragment03_content_container, fragment03a);
        fragmentTransaction.commit();

        final View rootView = inflater.inflate(R.layout.fragment03_d_menu, container, false);

        Button buttonA = (Button) rootView.findViewById(R.id.fragment03_multi_menu_btn_a);
        Button buttonB = (Button) rootView.findViewById(R.id.fragment03_multi_menu_btn_b);
        Button buttonC = (Button) rootView.findViewById(R.id.fragment03_multi_menu_btn_c);

        buttonA.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                replaceContainerFragment(new Fragment03a());

            }
        });

        buttonB.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                replaceContainerFragment(new Fragment03b());
            }
        });

        buttonC.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                replaceContainerFragment(new Fragment03c());
            }
        });

        return rootView;
    }

    private void replaceContainerFragment(Fragment fragment) {
        FragmentTransaction fragmentTransaction = getFragmentManager().beginTransaction();

        fragmentTransaction.setCustomAnimations(R.anim.abc_fade_in, R.anim.abc_fade_out);
        fragmentTransaction.replace(R.id.fragment03_content_container, fragment);
        fragmentTransaction.commit();
    }
}
