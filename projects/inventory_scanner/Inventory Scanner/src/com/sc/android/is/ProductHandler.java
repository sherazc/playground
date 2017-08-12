package com.sc.android.is;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

import android.app.Activity;
import android.os.Environment;
import android.webkit.WebView;

public class ProductHandler {

	private static final String DECORATOR_TOP = "product-top.html";
	private static final String DECORATOR_BOTTOM = "product-bottom.html";
	private static final String DB_FILE = "/is/db.csv";

	private Activity activity;

	public ProductHandler(Activity activity) {
		this.activity = activity;
	}

	public void fillProductView(String productId, WebView view) {
		if (productId == null || view == null) {
			return;
		}
		String productResult = this.buildProductResult(productId);
		if (productResult == null) {
			return;
		}
		String decoratedResult = this.buildDecorateResult(productResult);
		view.loadDataWithBaseURL("file:///android_asset/", decoratedResult, "text/html", "UTF-8", "");
	}

	private String buildProductResult(String productId) {
		StringBuffer productResult = new StringBuffer();
		File dbFile = new File(Environment.getExternalStorageDirectory().getPath() + DB_FILE);
		if (!dbFile.exists()) {
			productResult.append(DB_FILE).append(" do not exists.");
		} else {
			try {
				BufferedReader reader = new BufferedReader(new FileReader(dbFile));
				String fieldNames = reader.readLine();
				String line = "";
				String foundLine = null;
				while ((line = reader.readLine()) != null) {
					if (line.startsWith(productId)) {
						foundLine = line;
						break;
					}
				}

				if (foundLine == null) {
					productResult.append("<img src=\"images/orange_bullet_small.png\" width=\"15\" height=\"15\"/> Product not found. Product Id: ");
					productResult.append(productId);
				} else {
					StringTokenizer fieldNameTokenizer = new StringTokenizer(fieldNames, ",");
					StringTokenizer fieldValueTokenizer = new StringTokenizer(foundLine, ",");
					while (fieldNameTokenizer.hasMoreElements() && fieldValueTokenizer.hasMoreElements()) {
						String fieldName = fieldNameTokenizer.nextToken();
						String fieldValue = fieldValueTokenizer.nextToken();
						if (fieldName != null && fieldName.trim().length() > 0) {
							productResult
									.append("<tr><td width=\"10\" valign=\"middle\"><img src=\"images/orange_bullet_small.png\" width=\"15\" height=\"15\"/></td><td><b>");
							productResult.append(fieldName);
							productResult.append(": </b></td><td>");
							productResult.append(fieldValue);
							productResult.append("</td></tr><tr>");
						}
					}
				}
				reader.close();
			} catch (Exception e) {
				productResult = new StringBuffer();
				productResult.append("Error reading db file. ");
				productResult.append(DB_FILE);
				productResult.append("<br/>");
				productResult.append(e.getMessage());
			}
		}

		return productResult.toString();
	}

	private String buildDecorateResult(String result) {
		StringBuffer decoratedStringBuffer = new StringBuffer();
		try {
			decoratedStringBuffer.append(getAssetContent(DECORATOR_TOP));
			decoratedStringBuffer.append(result);
			decoratedStringBuffer.append(getAssetContent(DECORATOR_BOTTOM));

		} catch (Exception e) {
			decoratedStringBuffer = new StringBuffer();
			decoratedStringBuffer.append("Error decorating result.");
		}

		return decoratedStringBuffer.toString();
	}

	private String getAssetContent(String fileName) throws IOException {
		StringBuffer contentBuffer = new StringBuffer();
		InputStreamReader reader = new InputStreamReader(activity.getAssets().open(fileName));
		int ch = 0;
		while ((ch = reader.read()) != -1) {
			contentBuffer.append(((char) ch));
		}
		return contentBuffer.toString();
	}

}
