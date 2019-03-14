package com.sc.cdb.data.model.cc;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Document(collection = "centralControl")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class CentralControl {
    @Id
    private String id;

    @NotBlank
    private String companyId;

    private PrayerConfig prayerConfig;
    private List<Announcement> announcements;
    private List<Configuration> configurations;
    private List<Event> events;
    private List<Expense> expenses;
    private List<Fund> funds;
    private List<Jummah> jummahs;
}
