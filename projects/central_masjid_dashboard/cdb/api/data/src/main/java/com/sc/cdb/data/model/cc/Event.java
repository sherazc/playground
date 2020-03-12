package com.sc.cdb.data.model.cc;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sc.cdb.data.common.util.Constants;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Event {
    @JsonFormat(pattern= Constants.DATE_TIME_FORMAT)
    private Date date;
    private String title;
    private String time;
    private String description;
}
