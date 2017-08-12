package com.sc.rotd.app.service;

import android.app.IntentService;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.graphics.Color;
import android.media.RingtoneManager;
import android.support.v4.app.NotificationCompat;
import com.sc.rotd.api.domain.AyaDetail;
import com.sc.rotd.api.domain.enums.SuraName;
import com.sc.rotd.api.service.SearchService;
import com.sc.rotd.api.utils.CommonUtils;
import com.sc.rotd.app.R;
import com.sc.rotd.app.ReminderActivity;
import com.sc.rotd.app.persistence.SharedPreferencesManager;
import com.sc.rotd.app.view.TranslationViewArrayAdapter;

import java.util.List;

public class NotificationAlarmService extends IntentService {

    public static final int REMINDER_ACTIVITY_REQUEST_CODE = 97849709;
    public static final int REMINDER_NOTIFICATION_ID = 23374837;

    public NotificationAlarmService() {
        super("Notification Alarm Service");
    }

    @Override
    protected void onHandleIntent(Intent intent) {

        SearchService searchService = new SearchServiceAndroid(this);
        SharedPreferencesManager sharedPreferencesManager = new SharedPreferencesManager(this);

        String translationDisplayName = sharedPreferencesManager.findStringValue(
                TranslationViewArrayAdapter.TRANSLATION_DISPLAY_NAME_PREFERENCE);

        if (CommonUtils.isBlank(translationDisplayName)) {
            translationDisplayName = TranslationViewArrayAdapter.DEFAULT_TRANSLATION;
        }

        searchService.setTranslationDisplayName(translationDisplayName);

        List<AyaDetail> ayaDetails = searchService.search(0);
        if (ayaDetails != null && ayaDetails.size() > 0) {

            AyaDetail ayaDetail = ayaDetails.get(0);

            StringBuilder title = new StringBuilder();
            SuraName suraName = ayaDetail.getFirstAyaSuraName();
            if (suraName != null) {
                title.append(suraName.getEnglish()).append(" - ").append(suraName.getDescription()).append(" - ")
                        .append(suraName.getSuraNumber());
            }

            String reminderAyas = ayaDetail.combineAllAyaLines();
            String reminderTranslations = ayaDetail.combineAllTranslationLines();

            sendStyleNotification(title.toString(), reminderTranslations, reminderAyas + reminderTranslations);
        }

        NotificationAlarm.createInstance(this).setupNotification(1);
    }

    private void sendStyleNotification(String title, String detailText, String bigDetailText) {

        NotificationCompat.BigTextStyle style = new NotificationCompat.BigTextStyle();
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this);
        builder.setAutoCancel(true);
        builder.setContentText(detailText);
        builder.setContentTitle(title);
        builder.setSmallIcon(R.drawable.ic_launcher);
        builder.setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION));
        builder.setVibrate(new long[]{1000, 1000, 1000, 1000, 1000});
        builder.setLights(Color.YELLOW, 2000, 2000);

        PendingIntent notifyPIntent = PendingIntent.getActivity(getApplicationContext(), REMINDER_ACTIVITY_REQUEST_CODE,
                new Intent(this, ReminderActivity.class), PendingIntent.FLAG_UPDATE_CURRENT);
        builder.setContentIntent(notifyPIntent);

        builder.setStyle(style);
        style.bigText(bigDetailText);

        Notification notification = builder.build();
        NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        notificationManager.notify(REMINDER_NOTIFICATION_ID, notification);
    }
}
