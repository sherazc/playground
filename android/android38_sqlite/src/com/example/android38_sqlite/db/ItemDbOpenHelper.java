package com.example.android38_sqlite.db;

import com.example.android38_sqlite.utils.Constants;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteDatabase.CursorFactory;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

public class ItemDbOpenHelper extends SQLiteOpenHelper {

	private static final String DATABASE_NAME = "ITEM_DB";
	private static final int DATABASE_VERSION = 1;
	public static final String KEY_ID = "_id";
	public static final String[] ITEM_DATA_COLUMNS = new String[] {"ITEM_ID, ITEM_NAME, ITEM_PRICE, ITEM_QUANTITY"};
	

	private static final String DATABASE_CREATE = "CREATE TABLE ITEM_DATA (ITEM_ID INTEGER PRIMARY KEY AUTOINCREMENT, "
			+ "ITEM_NAME TEXT NOT NULL, ITEM_PRICE FLOAT, ITEM_QUANTITY INTEGER)";

	public ItemDbOpenHelper(Context context) {
		super(context, DATABASE_NAME, null, DATABASE_VERSION);
	}
	
	public ItemDbOpenHelper(Context context, String name, CursorFactory factory, int version) {
		super(context, name, factory, version);
	}

	@Override
	public void onCreate(SQLiteDatabase db) {
		Log.i(Constants.LOG_TAG, "Creating new Database... " + DATABASE_CREATE);
		db.execSQL(DATABASE_CREATE);
		Log.i(Constants.LOG_TAG, "Database Created!");

	}

	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
		Log.w(Constants.LOG_TAG, "Upgrading from version " + oldVersion + " to " + newVersion
				+ ", which will destroy all old data");

		db.execSQL("DROP TABLE IF IT EXISTS ITEM_DATA");
		this.onCreate(db);
	}

}
