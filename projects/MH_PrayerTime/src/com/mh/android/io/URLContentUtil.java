package com.mh.android.io;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

public class URLContentUtil {

	public InputStream openInputStreamOnURLResponse(String url) throws IOException {
		InputStream content = null;
		HttpGet httpGet = new HttpGet(url);
		HttpClient httpClient = new DefaultHttpClient();
		HttpResponse response = httpClient.execute(httpGet);
		content = response.getEntity().getContent();
		return content;
	}
	
	public String readStringFromInputStream(InputStream inputStream) throws IOException {
		BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
		StringBuilder stringBuilder = new StringBuilder();
		char[] buffer = new char[8192];
		int length = 0;
		
		while ((length = bufferedReader.read(buffer)) != -1) {
			stringBuilder.append(buffer, 0, length);
		}
		return stringBuilder.toString();
	}
	
	public String readStringFromURLResponse(String url) {
		String result = null;
		try {
			InputStream inputStream = this.openInputStreamOnURLResponse(url);
			result = this.readStringFromInputStream(inputStream);
		} catch (IOException e) {
			result = null;
		}
		return result;
	}
	
}
