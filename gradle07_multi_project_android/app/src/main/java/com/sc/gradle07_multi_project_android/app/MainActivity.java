package com.sc.gradle07_multi_project_android.app;

import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import com.sc.service.SearchMainData;
import org.apache.commons.lang3.math.NumberUtils;


public class MainActivity extends ActionBarActivity {

    private SearchMainData searchMainData;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        searchMainData = new SearchMainData();

    }

    public void findAndDisplayRecord(View view) {
        EditText recordNumber = (EditText) findViewById(R.id.recordNumber);
        String foundRecord = searchMainData.findByRecordNumber(NumberUtils.toInt(recordNumber.getText().toString()));
        TextView resultView = (TextView) findViewById(R.id.result);
        resultView.setText(foundRecord);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
