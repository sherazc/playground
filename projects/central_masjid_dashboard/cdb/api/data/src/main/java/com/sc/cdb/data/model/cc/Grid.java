package com.sc.cdb.data.model.cc;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Grid {
    private String name;
    private String description;
    private boolean enabled = false;
    private List<GridRecord> rows;
}
