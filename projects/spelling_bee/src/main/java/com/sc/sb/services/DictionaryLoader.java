package com.sc.sb.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Date;
import java.util.regex.Pattern;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.sc.sb.db.DatabaseManager;

@Component("dictionaryLoader")
public class DictionaryLoader {

	public static final int MAX_DEFINITION_LENGTH = 10240;

	private static final String DICTIONARY_TABLE_NAME = "dictionary";

	@Inject
	private JdbcTemplate jdbcTemplate;

	@Value("${dictionary.file.name}")
	private String dictionaryFileName;

	@Value("${reload.dictionary}")
	private boolean reloadDictionary;

	@Inject
	private DatabaseManager databaseManager;

	private Pattern wordPattern = Pattern.compile("([A-Z]+[-]+[A-Z]+)|([A-Z]+[-]+)|([A-Z]+)|([A-Z]+[']+[A-Z]+)");

	// ^(?!.*[a-z\\d]).+$

	public void load() {
		if (reloadDictionary || !isSetup()) {
			databaseManager.execute("drop table " + DICTIONARY_TABLE_NAME);
			databaseManager.execute("create table " + DICTIONARY_TABLE_NAME + " ("
					+ " id integer primary key IDENTITY, word varchar(150), definition varchar("
					+ DictionaryLoader.MAX_DEFINITION_LENGTH + ") )");
		} else {
			System.out.println("Not reloading dictionary.");
			return;
		}
		try (BufferedReader reader = new BufferedReader(new InputStreamReader(DictionaryLoader.class.getClassLoader()
				.getResource(dictionaryFileName).openStream()))) {

			System.out.println(new Date() + " Dictionary loading...");
			String line = null;
			String word = "";
			StringBuilder definition = new StringBuilder();
			while ((line = reader.readLine()) != null) {
				if (word != null && !isWord(line)) {
					definition.append(line).append("\n");
				}

				if (isWord(line)) {
					if (definition.length() > 0 && word.length() > 0) {
						if (definition.length() > MAX_DEFINITION_LENGTH) {
							definition = new StringBuilder(definition.substring(0, MAX_DEFINITION_LENGTH - 1));
						}
						try {
							jdbcTemplate.update("insert into " + DICTIONARY_TABLE_NAME
									+ " (word, definition) values (?, ?) ", word, definition);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}

					word = line;
					definition = new StringBuilder();
				}
			}
			System.out.println(new Date() + " Dictionary loaded.");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private boolean isSetup() {
		return databaseManager.execute("select count(*) from " + DICTIONARY_TABLE_NAME);
	}

	private boolean isWord(String line) {
		return wordPattern.matcher(line).matches();
	}
}
