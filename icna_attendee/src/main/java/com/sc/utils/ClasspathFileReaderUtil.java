package com.sc.utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import com.sc.exception.SystemConfigureException;

public class ClasspathFileReaderUtil {

	public static BufferedReader reader(String fileName) {
		BufferedReader reader = null;
		try {
			reader = new BufferedReader(new InputStreamReader(ClasspathFileReaderUtil.class.getClassLoader()
					.getResource(fileName).openStream()));
		} catch (Exception e) {
			throw new SystemConfigureException("Error loading file from classpath. " + fileName, e);
		}
		return reader;
	}

}
