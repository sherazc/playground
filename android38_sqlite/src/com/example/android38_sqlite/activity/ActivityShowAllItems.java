package com.example.android38_sqlite.activity;

import android.app.Activity;

import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TableRow.LayoutParams;
import android.widget.TextView;

import com.example.android38_sqlite.R;
import com.example.android38_sqlite.db.DbUtils;
import com.example.android38_sqlite.db.ItemDbOpenHelper;

public class ActivityShowAllItems extends Activity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.show_all_items);

		ItemDbOpenHelper itemDbOpenHelper = new ItemDbOpenHelper(this);
		SQLiteDatabase db = itemDbOpenHelper.getReadableDatabase();
		Cursor cursor = db.query("ITEM_DATA", ItemDbOpenHelper.ITEM_DATA_COLUMNS, null, null, null, null, null);
		int totalItems = cursor.getCount();
		if (totalItems > 0) {
			this.addDataGrid(cursor);
		}
		TextView total = (TextView) findViewById(R.id.textViewAllItemCount);
		total.setText("" + totalItems);
		db.close();
	}

	private void addDataGrid(Cursor cursor) {
		TableLayout tableLayout = (TableLayout) findViewById(R.id.tableLayoutAllData);
		while (cursor.moveToNext()) {
			int itemId = DbUtils.getInt(cursor, "ITEM_ID");
			String itemName = DbUtils.getString(cursor, "ITEM_NAME");
			double itemPrice = DbUtils.getDouble(cursor, "ITEM_PRICE");
			int itemQuantity = DbUtils.getInt(cursor, "ITEM_QUANTITY");
			addRow(tableLayout, itemId, itemName, itemPrice, itemQuantity);
		}
	}

	private void addRow(TableLayout tableLayout, int itemId, String itemName, double itemPrice, int itemQuantity) {

		LayoutParams layoutParams = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
		layoutParams.setMargins(1, 1, 1, 1);
		TableRow tableRow = new TableRow(this);
		TextView textViewItemId = new TextView(this);
		TextView textViewItemName = new TextView(this);
		TextView textViewItemPrice = new TextView(this);
		TextView textViewItemQuantity = new TextView(this);

		textViewItemId.setText("" + itemId);
		textViewItemName.setText(itemName);
		textViewItemPrice.setText("" + itemPrice);
		textViewItemQuantity.setText("" + itemQuantity);

		textViewItemId.setBackgroundColor(0xFFFFFFFF);
		textViewItemName.setBackgroundColor(0xFFFFFFFF);
		textViewItemPrice.setBackgroundColor(0xFFFFFFFF);
		textViewItemQuantity.setBackgroundColor(0xFFFFFFFF);

		tableRow.addView(textViewItemId, layoutParams);
		tableRow.addView(textViewItemName, layoutParams);
		tableRow.addView(textViewItemPrice, layoutParams);
		tableRow.addView(textViewItemQuantity, layoutParams);

		tableLayout.addView(tableRow);
	}
}
