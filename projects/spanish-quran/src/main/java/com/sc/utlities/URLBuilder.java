package com.sc.utlities;

import java.io.InputStream;
import java.net.URL;

public class URLBuilder {

	private static final String URL_PREFIX = "http://www.nurelislam.com/coran/scr/";
	private static final String URL_SUFFIX_1 = ".html";
	private static final String URL_SUFFIX_2 = ".htm";

	public String build(int pageNum) {

		String pageNumString = String.format("%03d", pageNum);

		String resultUrlString = URL_PREFIX + pageNumString + URL_SUFFIX_1;
		if (!this.ping(resultUrlString)) {
			resultUrlString = URL_PREFIX + pageNumString + URL_SUFFIX_2;
		}
		return resultUrlString;
	}

	private boolean ping(String urlString) {
		boolean result = false;
		try {
			URL url = new URL(urlString);
			InputStream stream = url.openStream();
			stream.close();
			result = true;
		} catch (Exception e) {
		}
		return result;
	}
}
