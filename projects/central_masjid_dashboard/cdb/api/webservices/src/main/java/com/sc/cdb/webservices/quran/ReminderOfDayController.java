package com.sc.cdb.webservices.quran;

import java.nio.charset.StandardCharsets;
import java.util.List;

import com.sc.cdb.webservices.utils.JsonpService;
import com.sc.reminder.api.domain.AyaDetail;
import com.sc.reminder.api.domain.ReminderDetail;
import com.sc.reminder.api.service.ReminderDecorator;
import com.sc.reminder.api.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/rod")
public class ReminderOfDayController {

    private JsonpService jsonpService;
    private ReminderDecorator reminderDecorator;

    @Autowired
    public ReminderOfDayController(JsonpService jsonpService,
                                   ReminderDecorator reminderDecorator) {
        this.jsonpService = jsonpService;
        this.reminderDecorator = reminderDecorator;
    }

    @GetMapping
    public ResponseEntity<?> reminderHistory(
            @RequestParam(value = "translation", defaultValue = "English_-_Saheeh_International")
                    String translation,
            @RequestParam(value = "history", defaultValue = "0")
                    int history,
            @RequestParam(value = "cb", required = false)
                    String cb) {

        SearchService searchService = new ResourceSearchService();
        searchService.setTranslationDisplayName(translation);

        List<AyaDetail> ayaDetails = searchService.search(history);

        List<ReminderDetail> reminderDetails = reminderDecorator.decorate(
                ayaDetails, translation);

        if (reminderDetails.size() == 1 && history == 0) {
            return generateResponse(reminderDetails.get(0), cb);
        } else {
            return generateResponse(reminderDetails, cb);
        }
    }

    private ResponseEntity<?> generateResponse(Object responseObject, String cb) {
        if (jsonpService.validCallback(cb)) {
            return ResponseEntity
                    .ok()
                    .contentType(new MediaType("application", "javascript", StandardCharsets.UTF_8))
                    .body(jsonpService.makeJsonpScript(cb, responseObject));
        } else {
            return ResponseEntity.ok(responseObject);
        }
    }
}
