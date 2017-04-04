package com.example.android38_sqlite.db;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;

public class ItemDao {

	private Context context;
	private ItemDbOpenHelper dbHelper;

	public ItemDao(Context context) {
		this.context = context;

		dbHelper = new ItemDbOpenHelper(context);
	}

	public void addItem(String itemName, double itemPrice, int itemQuantity) {
		SQLiteDatabase database = dbHelper.getWritableDatabase();
		database.execSQL("INSERT INTO ITEM_DATA (ITEM_NAME, ITEM_PRICE, ITEM_QUANTITY) VALUES (?,?,?) ", new Object[] {
				itemName, itemPrice, itemQuantity });
		database.close();
	}
}
