package com.sc.reminder.ws;

import com.sc.reminder.api.domain.AyaDetail;
import com.sc.reminder.api.domain.Line;
import com.sc.reminder.api.service.SearchService;
import com.sc.reminder.ws.services.ResourceSearchService;

import java.util.List;

/**
 * Hello world!
 */
public class App {
    public static void main(String[] args) {

        SearchService searchService = new ResourceSearchService();
        searchService.setTranslationDisplayName("English_-_Saheeh_International");

        List<AyaDetail> ayaDetails = searchService.search(2);

        for (AyaDetail ayaDetail : ayaDetails) {

            System.out.println("###############################");

            System.out.println("----------- Arabic -----------");
            for (Line ayaLine : ayaDetail.getAyas()) {
                System.out.println(ayaLine.getSuraNumber());
                System.out.println(ayaLine.getAyaNumber());
                System.out.println(ayaLine.getLineString());
            }

            System.out.println("----------- Translation -----------");
            for (Line translationLine : ayaDetail.getTranslations()) {
                System.out.println(translationLine.getSuraNumber());
                System.out.println(translationLine.getAyaNumber());
                System.out.println(translationLine.getLineString());
            }
        }

    }
}
