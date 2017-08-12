package com.example.android38_sqlite.db;

import android.database.Cursor;

public class DbUtils {

	public static String getString(Cursor cursor, String columnName) {
		String result = null;
		int columnIndex = cursor.getColumnIndex(columnName);
		if (columnIndex > -1) {
			result = cursor.getString(columnIndex);
		}
		return result;
	}

	public static int getInt(Cursor cursor, String columnName) {
		int result = 0;
		int columnIndex = cursor.getColumnIndex(columnName);
		if (columnIndex > -1) {
			result = cursor.getInt(columnIndex);
		}
		return result;
	}

	public static double getDouble(Cursor cursor, String columnName) {
		double result = 0;
		int columnIndex = cursor.getColumnIndex(columnName);
		if (columnIndex > -1) {
			result = cursor.getDouble(columnIndex);
		}
		return result;
	}
}
