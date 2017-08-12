package com.sc.android55_shared_preferences.app;

import android.content.Context;
import android.content.SharedPreferences;

import java.util.Map;

public class SharedPreferencesHandler {

    private static final String PREFERENCE_FILE_NAME = SharedPreferencesHandler.class.getCanonicalName();

    private Context context;
    private SharedPreferences sharedPreferences;

    public SharedPreferencesHandler(Context context) {
        this.context = context;
        sharedPreferences = context.getSharedPreferences(PREFERENCE_FILE_NAME, Context.MODE_PRIVATE);
    }

    public void saveStringValue(String key, String value) {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(key, value);
        editor.commit();
    }

    public String findStringValue(String key) {
        return sharedPreferences.getString(key, "");
    }

    public Map<String, ?> findAll() {
        return sharedPreferences.getAll();
    }

    public void remove(String key) {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.remove(key);
        editor.commit();
    }

    public void removeAll() {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.clear();
        editor.commit();
    }
}
