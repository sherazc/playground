package com.sc.android12;

import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TextView;

public class MainActivity extends Activity {

	private Spinner spinner1, spinner2;
	private Button buttonSubmit, addItemButton;
	private TextView textView1;
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.main);
		loadResources();
		
		addItemsOnSpinner2();
		addListenerOnButton();
		addListenerOnSpinnerItemSelection();
	}

	private void loadResources() {
		spinner1 = (Spinner) findViewById(R.id.spinner1);
		spinner2 = (Spinner) findViewById(R.id.spinner2);
		buttonSubmit = (Button) findViewById(R.id.buttonSubmit);
		addItemButton = (Button) findViewById(R.id.addItemButton);
		textView1 = (TextView) findViewById(R.id.textView1);
	}
	List<String> list = null;
	private void addItemsOnSpinner2() {
		list = new ArrayList<String>();
		list.add("list 1");
		list.add("list 2");
		list.add("list 3");

		ArrayAdapter<String> dataAdapter = new ArrayAdapter<String>(this,
				android.R.layout.simple_spinner_dropdown_item, list);
		dataAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

		spinner2.setAdapter(dataAdapter);
	}

	private void addListenerOnSpinnerItemSelection() {
		spinner1.setOnItemSelectedListener(new CustomOnItemSelectedListener());
	}

	private void addListenerOnButton() {
		buttonSubmit.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				textView1.setText("Spinner 1: " + String.valueOf(spinner1.getSelectedItem()) + "\nSpinner 2: "
						+ String.valueOf(spinner2.getSelectedItem()));
			}
		});
		
		addItemButton.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				list.add("New Item " + list.size());
				
			}
		});
	}
}