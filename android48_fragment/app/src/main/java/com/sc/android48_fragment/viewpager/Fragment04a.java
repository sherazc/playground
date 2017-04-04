package com.sc.android48_fragment.viewpager;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import com.sc.android48_fragment.app.R;

public class Fragment04a extends Fragment {

    public static final String POSITION = "position";
    public static final String IMAGE_ID = "imageId";

    public Fragment04a() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment04_a, container, false);
        int imageId = getArguments().getInt(IMAGE_ID);
        int position = getArguments().getInt(POSITION);

        ImageView imageView = (ImageView) rootView.findViewById(R.id.fragment04_a_image_view);
        imageView.setImageResource(imageId);

        TextView textView = (TextView) rootView.findViewById(R.id.fragment04_a_text_view);
        textView.setText("View Number: " + position);

        Toast.makeText(getActivity(), "Page Number: " + position, Toast.LENGTH_SHORT).show();

        return rootView;
    }

    public static Fragment newInstance(int position, int imageId) {

        Bundle bundle = new Bundle();
        bundle.putInt(POSITION, position);
        bundle.putInt(IMAGE_ID, imageId);

        Fragment04a fragment04a = new Fragment04a();
        fragment04a.setArguments(bundle);

        return fragment04a;
    }
}

