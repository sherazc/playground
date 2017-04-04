package com.sc.domain.dictionary;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.util.ArrayList;
import java.util.List;

public class DictionaryEntry {

    private String word;
    private String sound;
    private String pronunciation;
    private String functionalLabel;

    private List<Definition> definitions;

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getSound() {
        return sound;
    }

    public void setSound(String sound) {
        this.sound = sound;
    }

    public String getPronunciation() {
        return pronunciation;
    }

    public void setPronunciation(String pronunciation) {
        this.pronunciation = pronunciation;
    }

    public String getFunctionalLabel() {
        return functionalLabel;
    }

    public void setFunctionalLabel(String functionalLabel) {
        this.functionalLabel = functionalLabel;
    }

    public List<Definition> getDefinitions() {
        if (definitions == null) {
            definitions = new ArrayList<Definition>();
        }
        return definitions;
    }

    public void setDefinitions(List<Definition> definitions) {
        this.definitions = definitions;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.JSON_STYLE).append("word", word)
                .append("sound", sound)
                .append("pronunciation", pronunciation)
                .append("functionalLabel", functionalLabel)
                .append("definitions", getDefinitions())
                .toString();
    }
}
