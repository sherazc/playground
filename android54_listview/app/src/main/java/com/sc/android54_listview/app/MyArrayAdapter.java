package com.sc.android54_listview.app;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;


public class MyArrayAdapter extends ArrayAdapter<String> {

    private Context context;
    private int[] images;

    public MyArrayAdapter(Context context, int[] images) {
        super(context, R.layout.single_row);
        this.context = context;
        this.images = images;
    }

    @Override
    public int getCount() {
        return 1000;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // This call will recycle views to be reused
        View singleRowView = createOrConvertSingleRowView(parent, convertView);

        MyRowViewHolder myRowViewHolder = (MyRowViewHolder) singleRowView.getTag();
        ImageView imageView = myRowViewHolder.getImageView();
        TextView textViewTitle = myRowViewHolder.getTextViewTitle();
        TextView textViewDescription = myRowViewHolder.getTextViewDescription();

        imageView.setImageResource(images[position % 10]);
        textViewTitle.setText("Title " + position);
        textViewDescription.setText("This is some description " + position);


        return singleRowView;
    }

    private View createOrConvertSingleRowView(ViewGroup parent, View convertView) {
        // created and then hidden views will be passes in to convert view.
        View singleRow = convertView;
        if (singleRow == null) {
            LayoutInflater layoutInflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            // this line of code is very expensive. Should be avoided.
            singleRow = layoutInflater.inflate(R.layout.single_row, parent, false);

            // This is done to avoid view.findViewById(). This also somewhat an expensive call, since it has to
            // traverse through the layout tree to find the view.
            // this is called "Android View Holder" pattern
            singleRow.setTag(new MyRowViewHolder(singleRow));
        }

        return singleRow;
    }
}
