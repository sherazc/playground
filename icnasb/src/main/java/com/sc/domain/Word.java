package com.sc.domain;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document
public class Word extends BaseEntity {

    @Indexed
    private String word;
    private String bookId;
    private List<WordReference> wordReferences;

    public Word() {
    }

    public Word(String bookId, String word, Integer pageNumber, Long lineNumber, String wordReferenceLine) {
        this.word = word;
        this.bookId = bookId;
        if (pageNumber != null || lineNumber != null || StringUtils.isNotBlank(wordReferenceLine)) {
            this.getWordReferences().add(new WordReference(pageNumber, lineNumber, wordReferenceLine));
        }
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public List<WordReference> getWordReferences() {
        if (this.wordReferences == null) {
            this.wordReferences = new ArrayList<WordReference>();
        }
        return wordReferences;
    }

    public void setWordReferences(List<WordReference> wordReferences) {
        this.wordReferences = wordReferences;
    }

    @Transient
    public int getTotalWordReferences() {
        return this.getWordReferences().size();
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }

        if (!(obj instanceof Word)) {
            return false;
        }

        Word otherWord = (Word) obj;

        EqualsBuilder equalsBuilder = new EqualsBuilder().append(this.getBookId(), otherWord.getBookId())
                .append(this.getWord(), otherWord.getWord());
        return equalsBuilder.isEquals();
    }
}
