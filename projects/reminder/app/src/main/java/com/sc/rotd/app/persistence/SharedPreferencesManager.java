package com.sc.rotd.app.persistence;

import android.content.Context;
import android.content.SharedPreferences;

import java.util.HashMap;
import java.util.Map;

public class SharedPreferencesManager {

    public static Map<String, Object> cache = new HashMap<String, Object>();

    private static final String PREFERENCE_FILE_NAME = SharedPreferencesManager.class.getCanonicalName();

    private SharedPreferences sharedPreferences;

    public SharedPreferencesManager(Context context) {
        sharedPreferences = context.getSharedPreferences(PREFERENCE_FILE_NAME, Context.MODE_PRIVATE);
        cache.putAll(sharedPreferences.getAll());
    }

    public void saveIntValue(String key, int value) {
        cache.put(key, value);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putInt(key, value);
        editor.commit();
    }

    public void saveLongValue(String key, long value) {
        cache.put(key, value);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putLong(key, value);
        editor.commit();
    }

    public void saveStringValue(String key, String value) {
        cache.put(key, value);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(key, value);
        editor.commit();
    }

    public void saveBooleanValue(String key, boolean value) {
        cache.put(key, value);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putBoolean(key, value);
        editor.commit();
    }

    public int findIntValue(String key) {
        Integer result = (Integer) cache.get(key);
        if (result == null) {
            return sharedPreferences.getInt(key, -1);
        } else {
            return result;
        }
    }

    public long findLongValue(String key) {
        Long result = (Long) cache.get(key);
        if (result == null) {
            return sharedPreferences.getLong(key, -1);
        } else {
            return result;
        }
    }

    public String findStringValue(String key) {
        String result = (String) cache.get(key);
        if (result == null) {
            return sharedPreferences.getString(key, "");
        } else {
            return result;
        }
    }

    public boolean findBooleanValue(String key) {
        Boolean result = (Boolean) cache.get(key);
        if (result == null) {
            return sharedPreferences.getBoolean(key, false);
        } else {
            return result;
        }
    }

    public Map<String, ?> findAll() {
        return sharedPreferences.getAll();
    }

    public void remove(String key) {
        cache.remove(key);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.remove(key);
        editor.commit();
    }

    public void removeAll() {
        cache.clear();
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.clear();
        editor.commit();
    }
}
