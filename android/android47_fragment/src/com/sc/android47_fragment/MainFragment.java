package com.sc.android47_fragment;

import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

public class MainFragment extends Fragment {

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

		View view = inflater.inflate(R.layout.main_fragment, container, false);
		return view;
	}

	public void setText(String item) {
		TextView view = (TextView) getView().findViewById(R.id.main_fragment_text_01);
		view.setText(item);
	}
}
