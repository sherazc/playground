package com.sc.android54_listview.app;

import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.widget.ListView;


public class MainActivity extends ActionBarActivity {

    private int[] imageIds;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        int[] images = getImageIds();
        ListView list = (ListView) findViewById(R.id.list);
        MyArrayAdapter myArrayAdapter = new MyArrayAdapter(this, images);
        list.setAdapter(myArrayAdapter);
    }

    public int[] getImageIds() {
        return new int[]{
                R.drawable.image01,
                R.drawable.image02,
                R.drawable.image03,
                R.drawable.image04,
                R.drawable.image05,
                R.drawable.image06,
                R.drawable.image07,
                R.drawable.image08,
                R.drawable.image09,
                R.drawable.image10
        };
    }
}

