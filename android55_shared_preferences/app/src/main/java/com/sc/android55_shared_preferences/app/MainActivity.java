package com.sc.android55_shared_preferences.app;

import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Map;

public class MainActivity extends ActionBarActivity {

    private SharedPreferencesHandler sharedPreferencesHandler;
    private EditText editTextKey;
    private EditText editTextValue;
    private TextView textViewResult;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        sharedPreferencesHandler = new SharedPreferencesHandler(this);
        editTextKey = (EditText) findViewById(R.id.edit_key);
        editTextValue = (EditText) findViewById(R.id.edit_value);
        textViewResult = (TextView) findViewById(R.id.result);
    }

    public void addOrUpdate(View view) {
        showToast("addOrUpdate(View view)");
        String key = editTextKey.getText().toString();
        String value = editTextValue.getText().toString();
        sharedPreferencesHandler.saveStringValue(key, value);
        textViewResult.setText("Added " + key + "=" + value);
    }

    public void find(View view) {
        showToast("find(View view)");
        String key = editTextKey.getText().toString();
        String value = sharedPreferencesHandler.findStringValue(key);
        textViewResult.setText("Found " + key + "=" + value);
    }

    public void findAll(View view) {
        showToast("findAll(View view)");
        Map<String, ?> allRecords = sharedPreferencesHandler.findAll();

        StringBuilder stringBuilder = new StringBuilder();

        if (allRecords != null) {
            for (String key : allRecords.keySet()) {
                stringBuilder.append(key).append("=");
                Object value = allRecords.get(key);
                if (value != null) {
                    stringBuilder.append(value);
                }
                stringBuilder.append('\n');
            }
        }

        textViewResult.setText(stringBuilder);
    }

    public void remove(View view) {
        showToast("remove(View view)");
        String key = editTextKey.getText().toString();
        if (key != null) {
            sharedPreferencesHandler.remove(key);
        }
        textViewResult.setText("Removed " + key);
    }

    public void removeAll(View view) {
        showToast("removeAll(View view)");
        sharedPreferencesHandler.removeAll();
        textViewResult.setText("All Records Removed.");
    }

    private void showToast(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }

}
