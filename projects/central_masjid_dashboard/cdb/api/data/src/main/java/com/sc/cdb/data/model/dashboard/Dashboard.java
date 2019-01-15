package com.sc.cdb.data.model.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Dashboard {
    @Id
    private String id;

    private List<Announcement> announcements;
    private List<Config> configs;
    private List<Event> events;
    private List<Expense> expenses;
    private List<Fund> funds;
    private List<Jummah> jummahs;
}
