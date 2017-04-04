package com.sc.utlities;

import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;

public class URLReader {

	
	public StringBuffer read(String urlStr) {
		StringBuffer result = new StringBuffer();
		try {
			URL url = new URL(urlStr);
			Reader reader = new InputStreamReader(url.openStream(), "ISO-8859-1");
			int readCh = 0;
			while ((readCh = reader.read()) != -1) {
				result.append((char) readCh);
			}
			reader.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
}
