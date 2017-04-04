package com.sc.rotd.app;

import android.os.AsyncTask;
import com.sc.domain.AyaDetail;
import com.sc.service.SearchService;

import java.util.List;

public class ContentLoadAsyncTask extends AsyncTask<Object, Integer, Boolean> {

    
    private MainActivity mainActivity;
    private SearchService searchService;
    private List<AyaDetail> ayaDetails;


    public ContentLoadAsyncTask(MainActivity mainActivity, SearchService searchService) {
        super();
        this.mainActivity = mainActivity;


        this.searchService = searchService;
    }

    @Override
    protected Boolean doInBackground(Object... params) {

        ayaDetails = searchService.search(6, "en.yusufali");

        return true;
    }

    @Override
    protected void onPostExecute(Boolean aBoolean) {
        mainActivity.refreshAyaDetails(ayaDetails);
        mainActivity.showContentView();
    }


}
