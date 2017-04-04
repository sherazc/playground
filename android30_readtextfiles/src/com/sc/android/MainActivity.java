package com.sc.android;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.Reader;
import java.io.Writer;

import android.app.Activity;
import android.os.Bundle;
import android.os.Environment;
import android.view.Menu;
import android.widget.TextView;

public class MainActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        TextView file1Text = (TextView) findViewById(R.id.file1Text);
        try {
        	File file = new File(Environment.getExternalStorageDirectory().getPath() + "/test/testfile1.txt");
            
            if (!file.getParentFile().exists()) {
            	file.getParentFile().mkdir();
            }
            if (!file.exists()) {
            	file.createNewFile();
            	
            }
            Writer writer = new FileWriter(file);
            writer.write("This text is in the file");
            writer.flush();
            
            
            Reader reader = new FileReader(file);
            String result = "";
            int ch = 0;
            while((ch= reader.read()) != -1) {
            	result += ("" + ((char) ch));
            }
            file1Text.setText(result);
//        	if(!Environment.MEDIA_MOUNTED.equals(Environment.getExternalStorageState())){
//        		file1Text.setText("Not mounted");
//        		
//        	} else {
//        		file1Text.setText("mounted");
//        	}
        	//file1Text.setText();
		} catch (Exception e) {
			file1Text.setText(e.getMessage());
		}
        
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    
}
