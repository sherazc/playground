package com.sc.utils;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import org.apache.commons.lang.StringUtils;

public class CreateZipStates {
	public static void main(String[] args) throws Exception {
		new CreateZipStates().run();
	}

	public void run() throws Exception {
		BufferedReader stateReader = new BufferedReader(new FileReader("state.csv"));
		Map<String, String> states = new HashMap<String, String>();
		String line = null;
		while ((line = stateReader.readLine()) != null) {
			StringTokenizer stateToken = new StringTokenizer(line, ",");
			String fullName = StringUtils.remove(stateToken.nextToken(), '\"');
			String abvName = StringUtils.remove(stateToken.nextToken(), '\"');
			states.put(abvName, fullName);
		}

		BufferedReader zipReader = new BufferedReader(new FileReader("ZIP_CODES_2.csv"));
		BufferedWriter zipWriter = new BufferedWriter(new FileWriter("ZIP_CODES_3.csv"));

		while ((line = zipReader.readLine()) != null) {
			String abvName = line.substring(line.length() - 2, line.length());
			String lineGen = line;
			lineGen += ",";
			String stateFullName = states.get(abvName);
			if (stateFullName == null || stateFullName.length() < 1) {
				System.out.println("Error");
				lineGen += abvName;
			} else {
				lineGen += stateFullName;
			}
			lineGen += "\n";
			zipWriter.write(lineGen);
		}

		stateReader.close();
		zipReader.close();
		zipWriter.flush();
		zipWriter.close();
		System.out.println("Complete!");
	}
}
