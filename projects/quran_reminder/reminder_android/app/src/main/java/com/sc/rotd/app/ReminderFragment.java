package com.sc.rotd.app;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;
import com.sc.rotd.api.domain.AyaDetail;
import com.sc.rotd.app.view.AyaListArrayAdapter;

public class ReminderFragment extends Fragment {

    private View rootView;
    private AyaDetail ayaDetail;

    public ReminderFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.reminder_fragment, container, false);
        ListView listView = (ListView) rootView.findViewById(R.id.reminder_fragment_aya_list_view);
        AyaListArrayAdapter ayaListArrayAdapter = new AyaListArrayAdapter((ReminderActivity) rootView.getContext(), getAyaDetail());
        listView.setAdapter(ayaListArrayAdapter);
        // This call will make sure that Fragment is not destroyed
        setRetainInstance(true);
        return rootView;
    }

    public AyaDetail getAyaDetail() {
        return ayaDetail;
    }

    public void setAyaDetail(AyaDetail ayaDetail) {
        this.ayaDetail = ayaDetail;
    }
}
