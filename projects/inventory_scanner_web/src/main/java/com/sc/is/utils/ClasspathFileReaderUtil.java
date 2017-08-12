package com.sc.is.utils;

import java.io.BufferedReader;

import java.io.InputStreamReader;

import com.sc.is.exception.SystemConfigureException;

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
