package com.sc.domain.dictionary;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.util.ArrayList;
import java.util.List;

public class Definition {

    private String text;
    private List<String> usages;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<String> getUsages() {
        if (usages == null) {
            usages = new ArrayList<String>();
        }
        return usages;
    }

    public void setUsages(List<String> usages) {
        this.usages = usages;
    }

    @Override
    public String toString() {
        ToStringBuilder toStringBuilder = new ToStringBuilder(this, ToStringStyle.JSON_STYLE)
                .append("text", this.text);
        for (String usage : getUsages()) {
            toStringBuilder.append("usage", usage);
        }
        return toStringBuilder.toString();
    }
}
