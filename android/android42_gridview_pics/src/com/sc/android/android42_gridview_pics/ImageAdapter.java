package com.sc.android.android42_gridview_pics;

import java.lang.reflect.Field;

import android.content.Context;
import android.graphics.Bitmap;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;

public class ImageAdapter extends BaseAdapter {
	private Integer[] images;

	private Context context;

	private Bitmap[] cache;

	public ImageAdapter(Context context) {
		this.context = context;
		Field[] list = R.drawable.class.getFields();

		int count = 0, index = 0, j = list.length;

		for (int i = 0; i < j; i++) {
			if (list[i].getName().startsWith("img_")) {
				count++;
			}

		}
		images = new Integer[count];
		cache = new Bitmap[count];
		
		try {
			for (int i = 0; i < j; i++) {
				if (list[i].getName().startsWith("img_")) {
					images[index++] = list[i].getInt(null);
				}
			}
		} catch (Exception e) {
		}
	}

	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		return images.length;
	}

	@Override
	public Object getItem(int arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long getItemId(int arg0) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public View getView(int arg0, View arg1, ViewGroup arg2) {
		// TODO Auto-generated method stub
		return null;
	}

}
