package com.sc.android.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpParams;

public class HttpUtils {
	public static final int METHOD_GET = 1234;
	public static final int METHOD_POST = 5678;

	public static String sendRequest(int method, String urlString, Map<String, String> parameters, String jsonString)
			throws ClientProtocolException, IOException {
		if (StringUtils.isBlank(urlString)) {
			return null;
		}

		StringBuilder stringBuilder = new StringBuilder();
		HttpClient client = new DefaultHttpClient();

		HttpRequestBase request = null;

		if (METHOD_POST == method) {
			HttpPost postRequest = new HttpPost(urlString);
			if (StringUtils.isNotBlank(jsonString)) {
				postRequest.setEntity(new StringEntity(jsonString));
			}
			request = postRequest;
		} else {
			request = new HttpGet(urlString);
		}
		
		if (parameters != null && parameters.size() > 0) {
			HttpParams httpParams = new BasicHttpParams();
			for (String parameterName : parameters.keySet()) {
				httpParams.setParameter(parameterName, parameters.get(parameterName));
			}
			request.setParams(httpParams);
		}
		HttpResponse response = client.execute(request);
		StatusLine statusLine = response.getStatusLine();
		int statusCode = statusLine.getStatusCode();
		if (statusCode == 200) {
			HttpEntity entity = response.getEntity();
			InputStream content = entity.getContent();
			BufferedReader reader = new BufferedReader(new InputStreamReader(content));
			String line;
			while ((line = reader.readLine()) != null) {
				stringBuilder.append(line);
			}
		}
		return stringBuilder.toString();
	}
}
