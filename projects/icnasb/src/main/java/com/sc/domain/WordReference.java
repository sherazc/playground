package com.sc.domain;

public class WordReference {
    private Integer pageNumber;
    private Long lineNumber;
    private String wordReferenceLine;

    public WordReference() {
    }

    public WordReference(Integer pageNumber, Long lineNumber, String wordReferenceLine) {
        this.pageNumber = pageNumber;
        this.lineNumber = lineNumber;
        this.wordReferenceLine = wordReferenceLine;
    }

    public Integer getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(Integer pageNumber) {
        this.pageNumber = pageNumber;
    }

    public Long getLineNumber() {
        return lineNumber;
    }

    public void setLineNumber(Long lineNumber) {
        this.lineNumber = lineNumber;
    }

    public String getWordReferenceLine() {
        return wordReferenceLine;
    }

    public void setWordReferenceLine(String wordReferenceLine) {
        this.wordReferenceLine = wordReferenceLine;
    }
}
