package com.sc.rotd.app;

import android.os.AsyncTask;
import com.sc.rotd.api.domain.AyaDetail;
import com.sc.rotd.api.service.SearchService;
import com.sc.rotd.app.service.NotificationAlarm;

import java.util.List;

public class ContentLoadAsyncTask extends AsyncTask<Object, Integer, Boolean> {

    private ReminderActivity reminderActivity;
    private SearchService searchService;
    private List<AyaDetail> ayaDetails;

    public ContentLoadAsyncTask(ReminderActivity reminderActivity, SearchService searchService) {
        super();
        this.reminderActivity = reminderActivity;
        this.searchService = searchService;
    }

    @Override
    protected Boolean doInBackground(Object... params) {
        ayaDetails = searchService.search(SearchService.HISTORY_DAYS);
        NotificationAlarm.createInstance(reminderActivity).setupOrCancelNotificationAlarm();
        return true;
    }

    @Override
    protected void onPostExecute(Boolean aBoolean) {
        reminderActivity.refreshAyaDetails(ayaDetails);
        reminderActivity.showContentView();
    }
}
