package com.example.android38_sqlite.listener;

import com.example.android38_sqlite.R;
import com.example.android38_sqlite.db.ItemDao;

import android.app.Activity;
import android.view.TextureView;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.EditText;

public class AddItemOnClickListener implements OnClickListener {

	private Activity activity;
	private ItemDao itemDao;

	public AddItemOnClickListener(Activity activity) {
		this.activity = activity;
		itemDao = new ItemDao(activity);
	}

	@Override
	public void onClick(View v) {
		EditText editTextItemName = (EditText) activity.findViewById(R.id.editTextItemName);
		EditText editTextItemPrice = (EditText) activity.findViewById(R.id.editTextItemPrice);
		EditText editTextItemQuantity = (EditText) activity.findViewById(R.id.editTextItemQuantity);
		itemDao.addItem(editTextItemName.getText().toString(), convertDouble(editTextItemPrice.getText().toString()),
				convertInt(editTextItemQuantity.getText().toString()));
	}

	private int convertInt(String string) {
		int result = 0;
		try {
			result = Integer.parseInt(string);
		} catch (Exception e) {
		}
		return result;
	}

	private double convertDouble(String string) {
		double result = 0;
		try {
			result = Double.parseDouble(string);
		} catch (Exception e) {
		}
		return result;
	}
}
