package com.sc.cdb.data.model.picklist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Configuration {
    enum Type {
        text, date, number, bool, time
    }
    private String name;
    private Type type;
    private String label;
    private String defaultValue;
    private String description;

}
