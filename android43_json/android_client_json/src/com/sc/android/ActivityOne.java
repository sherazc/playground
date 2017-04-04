package com.sc.android;

import java.util.List;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sc.android.domain.StoreItem;
import com.sc.android.utils.HttpUtils;

public class ActivityOne extends Activity implements OnClickListener {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activityone_layout);
		Button button = (Button) findViewById(R.id.one_button_all_store_items);
		button.setOnClickListener(this);
	}

	@Override
	public void onClick(View v) {
		LinearLayout view = (LinearLayout) findViewById(R.id.one_list_view);
		view.removeAllViews();
		try {
			StringBuilder storeItemsJson = getAllStoreItemsJson();
			ObjectMapper objectMapper = new ObjectMapper();
			List<StoreItem> storeItems = objectMapper.readValue(storeItemsJson.toString(), new TypeReference<List<StoreItem>>() {
			});

			if (storeItems != null && storeItems.size() > 0) {
				for (StoreItem storeItem : storeItems) {
					TextView textView = new TextView(this);
					textView.setText("Item id = " + storeItem.getId() + " Name = " + storeItem.getName() + ", Price = $" + storeItem.getPrice());
					view.addView(textView);
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	private StringBuilder getAllStoreItemsJson() {
		EditText editTextUrl = (EditText) findViewById(R.id.one_text_url);
		StringBuilder stringBuilder = new StringBuilder();
		try {
			String responseJson = HttpUtils.sendRequest(HttpUtils.METHOD_GET, editTextUrl.getText().toString(), null,
					null);
			stringBuilder.append(responseJson);
		} catch (Exception e) {
			stringBuilder.append("Error: " + e.getMessage());
			Log.e("android_client_jsong", e.getMessage());
		}
		return stringBuilder;
	}
}
