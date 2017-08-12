package com.sc.android;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sc.android.domain.StoreItem;
import com.sc.android.utils.HttpUtils;

import android.app.Activity;
import android.content.Context;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

public class ActivityTwo extends Activity implements OnClickListener {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activitytwo_layout);
		Button button = (Button) findViewById(R.id.two_button_all_store_items);
		button.setOnClickListener(this);
	}

	@Override
	public void onClick(View v) {
		EditText editTextUrl = (EditText) findViewById(R.id.two_text_url);
		new StoreItemAsync(this).execute(editTextUrl.getText().toString());
	}

	private class StoreItemAsync extends AsyncTask<String, Integer, List<View>> {

		private Context context;
		private ProgressBar progressBar;

		public StoreItemAsync(Context context) {
			this.context = context;
		}

		@Override
		protected void onPreExecute() {
			LinearLayout containerView = (LinearLayout) findViewById(R.id.two_list_view);
			containerView.removeAllViews();
			progressBar = new ProgressBar(context, null, android.R.attr.progressBarStyleHorizontal);
			progressBar.setMax(100);
			containerView.addView(progressBar);
			
		}
		
		@Override
		protected List<View> doInBackground(String... urlStrings) {
			List<View> storeItemViews = new ArrayList<View>();
			try {
				StringBuilder storeItemsJson = getAllStoreItemsJson(urlStrings[0]);
				ObjectMapper objectMapper = new ObjectMapper();
				List<StoreItem> storeItems = objectMapper.readValue(storeItemsJson.toString(),
						new TypeReference<List<StoreItem>>() {
						});

				if (storeItems != null && storeItems.size() > 0) {
					int totalSize = storeItems.size();
					int currentIndex = 0;
					for (StoreItem storeItem : storeItems) {
						TextView textView = new TextView(context);
						textView.setText("Item id = " + storeItem.getId() + " Name = " + storeItem.getName()
								+ ", Price = $" + storeItem.getPrice());

						storeItemViews.add(textView);
						currentIndex++;
						publishProgress((int) ((currentIndex / (double) totalSize) * 100));
						//Thread.sleep(50);
					}
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return storeItemViews;
		}

		private StringBuilder getAllStoreItemsJson(String urlString) {

			StringBuilder stringBuilder = new StringBuilder();
			try {
				String responseJson = HttpUtils.sendRequest(HttpUtils.METHOD_GET, urlString, null, null);
				stringBuilder.append(responseJson);
			} catch (Exception e) {
				stringBuilder.append("Error: " + e.getMessage());
				Log.e("android_client_jsong", e.getMessage());
			}
			return stringBuilder;
		}

		@Override
		protected void onProgressUpdate(Integer... progress) {
			setProgress(progress[0]);
			TextView progressTextView = (TextView) findViewById(R.id.two_text_progress);
			progressTextView.setText(progress[0] + " %");
			progressBar.setProgress(progress[0]);
		}

		@Override
		protected void onPostExecute(List<View> result) {
			LinearLayout containerView = (LinearLayout) findViewById(R.id.two_list_view);
			for (View view : result) {
				containerView.addView(view);
			}
		}
	}

}
