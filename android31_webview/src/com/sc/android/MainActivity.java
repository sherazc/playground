package com.sc.android;

import java.io.IOException;
import java.io.InputStreamReader;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.webkit.WebView;

public class MainActivity extends Activity {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		WebView webView = (WebView) findViewById(R.id.webView1);
		try {
			InputStreamReader reader = new InputStreamReader(getAssets().open("file1.html"));
			String fileContent = "";
			int ch = 0;
			while ((ch = reader.read()) != -1) {
				fileContent += ((char) ch);
			}
			// webView.loadData(fileContent, "text/html", "UTF-8");
			webView.loadDataWithBaseURL("file:///android_asset/", fileContent, "text/html", "UTF-8", "");

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// webView.loadUrl("file:///android_asset/file1.html");
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}
}
