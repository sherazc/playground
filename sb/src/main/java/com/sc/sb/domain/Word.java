package com.sc.sb.domain;

import org.apache.commons.lang.StringUtils;

public class Word {

	private Long id;
	private String word;
	private String definition;
	private String documentName;
	private Integer pageNumber;
	private Long lineNumber;
	private String wordReferenceLine;

	public Word() {
	}

	public Word(Long id, String word, String definition, String documentName, int pageNumnber, long lineNumber,
			String wordReferenceLine) {
		super();
		this.id = id;
		this.word = word;
		this.definition = definition;
		this.documentName = documentName;
		this.pageNumber = pageNumnber;
		this.lineNumber = lineNumber;
		this.wordReferenceLine = wordReferenceLine;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getWord() {
		return word;
	}

	public void setWord(String word) {
		this.word = word;
	}

	public String getDefinition() {
		return definition;
	}

	public void setDefinition(String definition) {
		this.definition = definition;
	}

	public String getDocumentName() {
		return documentName;
	}

	public void setDocumentName(String documentName) {
		this.documentName = documentName;
	}

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public long getLineNumber() {
		return lineNumber;
	}

	public void setLineNumber(long lineNumber) {
		this.lineNumber = lineNumber;
	}

	public String getWordReferenceLine() {
		return wordReferenceLine;
	}

	public void setWordReferenceLine(String wordReferenceLine) {
		this.wordReferenceLine = wordReferenceLine;
	}

	@Override
	public String toString() {
		String lineBreak = "\n";
		StringBuilder wordString = new StringBuilder();
		wordString.append("Id = ").append(id).append(lineBreak);
		wordString.append("Word = ").append(word).append(lineBreak);
		wordString.append("Page number = ").append(pageNumber).append(lineBreak);
		wordString.append("Line number = ").append(lineNumber).append(lineBreak);
		wordString.append("Word reference line = ").append(wordReferenceLine).append(lineBreak);
		wordString.append("Document name = ").append(documentName).append(lineBreak);
		if (StringUtils.isNotBlank(definition)) {
			wordString.append("Definition = ").append(definition).append(lineBreak);
		}
		return wordString.toString();
	}
}
