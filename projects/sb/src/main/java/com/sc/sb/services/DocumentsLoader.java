package com.sc.sb.services;

import java.io.File;
import java.io.StringWriter;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.inject.Inject;

import org.apache.commons.lang.StringUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.util.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.sc.sb.db.DatabaseManager;
import com.sc.sb.io.FileManager;

@Component("documentsLoader")
public class DocumentsLoader {

	private static final String DOCUMENT_TABLE_NAME = "document_words";

	private static final Pattern WORD_PATTERN = Pattern.compile("[\\w'-]+");

	private static final Pattern NOT_NUMBER_PATTERN = Pattern.compile("[^0-9]+");

	@Inject
	private DatabaseManager databaseManager;

	@Inject
	private FileManager fileManager;

	@Value("${reload.documents}")
	private boolean reloadDocuments;

	@Value("${doc.dir.input}")
	private String directorySourceName;

	@Inject
	private JdbcTemplate jdbcTemplate;

	public void load() {
		if (reloadDocuments || !isSetup()) {
			databaseManager.execute("drop table " + DOCUMENT_TABLE_NAME);
			databaseManager
					.execute("create table "
							+ DOCUMENT_TABLE_NAME
							+ " ("
							+ " id integer primary key IDENTITY, word varchar(150) unique, definition varchar("
							+ DictionaryLoader.MAX_DEFINITION_LENGTH
							+ "), document_name varchar(100), page_number integer, line_number integer, word_reference_line varchar(2048))");
		} else {
			System.out.println("Not reloading documents.");
			return;
		}

		System.out.println(new Date() + " Documents loading...");
		File[] inputDocumentFiles = fileManager.getAllFiles(directorySourceName, FileManager.PDF);

		loadDocumentInDatabase(inputDocumentFiles);

		System.out.println(new Date() + " Documents loaded.");
	}

	private void insertWordInDocumentDatabase(String word, String documentName, String line, int pageNumber,
			long lineNumber) {

		if (StringUtils.isBlank(word)) {
			return;
		}
		String wordCaps = word.toUpperCase();
		if (StringUtils.isBlank(word) || !wordInsertable(wordCaps)) {
			return;
		}

		String wordDefinition = getWordDefinition(wordCaps);

		String insertSql = "insert into " + DOCUMENT_TABLE_NAME
				+ " (word, definition, document_name, page_number, line_number, word_reference_line) "
				+ " values (?,?,?,?,?,?) ";
		try {
			jdbcTemplate.update(insertSql, wordCaps, wordDefinition, documentName, new Integer(pageNumber), new Long(
					lineNumber), line);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private boolean wordInsertable(String word) {
		boolean result = StringUtils.isNotBlank(word);
//		result = result && word.length() >= wordLengthMin;
//		result = result && word.length() <= wordLengthMax;
		Matcher notWordMatcher = NOT_NUMBER_PATTERN.matcher(word);
		result = result && notWordMatcher.matches();
		result = result && !wordExistsInDb(word);
		return result;
	}

	private boolean wordExistsInDb(String word) {
		Map<String, Object> wordCountMap = jdbcTemplate.queryForMap("select count(*) word_count from "
				+ DOCUMENT_TABLE_NAME + " where word=?", word);
		Long wordCount = (Long) wordCountMap.get("word_count");
		return wordCount > 0;
	}

	private String getWordDefinition(String wordCaps) {
		List<Map<String, Object>> definitionRecords = jdbcTemplate.queryForList("select definition from dictionary where word=?", wordCaps);
		if (definitionRecords == null || definitionRecords.size() < 1) {
			return null;
		}
		return (String) definitionRecords.get(0).get("definition");
	}

	private void loadDocumentInDatabase(File[] inputDocumentFiles) {
		if (inputDocumentFiles == null || inputDocumentFiles.length < 1) {
			System.out.println("No documents found to convert.");
			return;
		}

		for (File inputDocumentFile : inputDocumentFiles) {
			String documentName = getFileNameNoExtention(inputDocumentFile.getName(), FileManager.PDF);

			try {
				PDDocument pdDocument = PDDocument.load(inputDocumentFile);

				int totalPages = pdDocument.getNumberOfPages();
				long linePointer = 0;

				for (int currectPage = 1; currectPage < totalPages; currectPage++) {
					// Resetting linePointer on each page
					linePointer = 1;
					StringWriter outputWriter = new StringWriter();
					PDFTextStripper stripper = new PDFTextStripper();
					stripper.setStartPage(currectPage);
					stripper.setEndPage(currectPage);
					stripper.writeText(pdDocument, outputWriter);
					String pageString = outputWriter.toString();

					linePointer = writePageWordsToDb(documentName, currectPage, pageString, linePointer);
				}

				if (pdDocument != null) {
					pdDocument.close();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	private long writePageWordsToDb(String documentName, int pageNumber, String pageString, long linePointer) {
		Scanner scanner = new Scanner(pageString);
		while (scanner.hasNextLine()) {
			linePointer++;
			String line = scanner.nextLine();
			Matcher lineWordMatcher = WORD_PATTERN.matcher(line);
			while (lineWordMatcher.find()) {
				String word = line.substring(lineWordMatcher.start(), lineWordMatcher.end());
				insertWordInDocumentDatabase(word, documentName, line, pageNumber, linePointer);
			}

		}
		scanner.close();
		return linePointer;
	}

	private String getFileNameNoExtention(String fileName, String extention) {
		return fileName.substring(0, fileName.indexOf(extention) - 1);
	}

	private boolean isSetup() {
		return databaseManager.execute("select count(*) from " + DOCUMENT_TABLE_NAME);
	}
}
