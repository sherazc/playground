package com.sc.cdb.data.model.common;

import lombok.Data;

/**
 * Used in the import export process.
 */
@Data
public class File {
    private String name;
    private StringBuilder content = new StringBuilder();
}
