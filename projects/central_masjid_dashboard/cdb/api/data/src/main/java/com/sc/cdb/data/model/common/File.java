package com.sc.cdb.data.model.common;

import lombok.Data;

@Data
public class File {
    private String name;
    private StringBuilder content = new StringBuilder();
}
