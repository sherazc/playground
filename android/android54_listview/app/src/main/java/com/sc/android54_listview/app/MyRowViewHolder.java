package com.sc.android54_listview.app;

import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

public class MyRowViewHolder {

    private ImageView imageView;
    private TextView textViewTitle;
    private TextView textViewDescription;

    public MyRowViewHolder(View view) {
        imageView = (ImageView) view.findViewById(R.id.imageView);
        textViewTitle = (TextView) view.findViewById(R.id.textViewTitle);
        textViewDescription = (TextView) view.findViewById(R.id.textViewDescription);
    }

    public ImageView getImageView() {
        return imageView;
    }

    public void setImageView(ImageView imageView) {
        this.imageView = imageView;
    }

    public TextView getTextViewTitle() {
        return textViewTitle;
    }

    public void setTextViewTitle(TextView textViewTitle) {
        this.textViewTitle = textViewTitle;
    }

    public TextView getTextViewDescription() {
        return textViewDescription;
    }

    public void setTextViewDescription(TextView textViewDescription) {
        this.textViewDescription = textViewDescription;
    }
}
