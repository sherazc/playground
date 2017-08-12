package com.sc.rotd.app.helper;

import android.content.Intent;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.widget.Toolbar;
import android.widget.TextView;
import android.widget.Toast;
import com.sc.rotd.api.domain.AyaDetail;
import com.sc.rotd.api.domain.enums.SuraName;
import com.sc.rotd.app.ChapterNameFragment;
import com.sc.rotd.app.R;
import com.sc.rotd.app.ReminderActivity;
import com.sc.rotd.app.utils.CommonAndroidUtils;

import java.util.List;

public class ReminderActivityHelper {

    public static final String SAVED_AYA_DETAIL_SEQUENCE_NUMBER_SEED = "SAVED_AYA_DETAIL_SEQUENCE_NUMBER_SEED";
    public static final String SAVED_PAGE = "SAVED_PAGE";

    private ReminderActivity reminderActivity;

    public ReminderActivityHelper(ReminderActivity reminderActivity) {
        this.reminderActivity = reminderActivity;
    }

    public void shareCurrentSelectedAya() {
        AyaDetail ayaToShare = reminderActivity.getAyaDetails().get(reminderActivity.getViewPager().getCurrentItem());
        if (ayaToShare != null) {
            StringBuilder data = new StringBuilder();
            data.append("Sura ");
            data.append(ayaToShare.getFirstAyaSuraName().getSuraNumber());
            data.append(' ');
            data.append(ayaToShare.getFirstAyaSuraName().getEnglish());
            String subject = data.toString();
            data.append('\n');
            data.append(ayaToShare.combineAllAyaLines());
            data.append('\n');
            data.append(ayaToShare.combineAllTranslationLines());

            Intent intent = new Intent(Intent.ACTION_SEND);
            intent.setType("text/plan");

            intent.putExtra(Intent.EXTRA_SUBJECT, subject);
            intent.putExtra(Intent.EXTRA_TEXT, data.toString());

            try {
                reminderActivity.startActivity(Intent.createChooser(intent, "Share " + subject));
            } catch (android.content.ActivityNotFoundException ex) {
                Toast.makeText(reminderActivity, "There are no messing applications installed.", Toast.LENGTH_SHORT).show();
            }
        }
    }

    public void populateChapterNameFragment(List<AyaDetail> ayaDetails, int currentPageNumber) {
        if (ayaDetails == null || ayaDetails.size() < currentPageNumber + 1) {
            return;
        }
        AyaDetail chapterNameAyaDetail = ayaDetails.get(currentPageNumber);
        TextView header_sura_name_english = (TextView) reminderActivity.findViewById(R.id.header_sura_name_english);
        TextView header_sura_name_arabic = (TextView) reminderActivity.findViewById(R.id.header_sura_name_arabic);
        TextView header_sura_name_description = (TextView) reminderActivity.findViewById(R.id.header_sura_name_description);
        TextView reminder_date = (TextView) reminderActivity.findViewById(R.id.reminder_date);

        SuraName suraName = chapterNameAyaDetail.getFirstAyaSuraName();
        header_sura_name_english.setText(suraName.getEnglish());
        header_sura_name_arabic.setText(suraName.getArabic());
        String suraDescription = suraName.getDescription() + " - Sura: " + suraName.getSuraNumber();
        header_sura_name_description.setText(suraDescription);
        reminder_date.setText(chapterNameAyaDetail.getDisplayDate());
    }

    public void loadChapterNameFragment() {
        ChapterNameFragment chapterNameFragment = ChapterNameFragment.newInstance(null);
        FragmentTransaction fragmentTransaction = reminderActivity.getSupportFragmentManager().beginTransaction();
        fragmentTransaction.replace(R.id.chapter_name_layout, chapterNameFragment,
                ChapterNameFragment.CHAPTER_NAME_FRAGMENT_NAME);
        fragmentTransaction.commit();
    }

    public void loadToolbar() {
        Toolbar toolbar = (Toolbar) reminderActivity.findViewById(R.id.app_bar);
        toolbar.setLogo(R.drawable.ic_launcher);
        toolbar.setTitle(null);
        toolbar.setSubtitle(null);
        reminderActivity.setSupportActionBar(toolbar);
    }

    public void loadTranslationSpinner() {
        String selectedTranslationName = CommonAndroidUtils.translationNameFromSPM(
                reminderActivity.getSharedPreferencesManager());

        TextView selectedTranslation = (TextView) reminderActivity.findViewById(R.id.app_bar_selected_translation);
        selectedTranslation.setText(selectedTranslationName);
    }


    public int readValidTheLastSavedPage(List<AyaDetail> ayaDetails) {
        if (ayaDetails == null || ayaDetails.size() < 1) {
            return 0;
        }
        int firstAyaDetailSequenceNumberSeed = getFirstAyaDetailSequenceNumberSeed(ayaDetails);

        if (firstAyaDetailSequenceNumberSeed < 0) {
            return 0;
        }

        int savedAyaDetailSequenceNumberSeed = readSavedAyaDetailSequenceNumberSeed();

        int result = 0;
        if (savedAyaDetailSequenceNumberSeed == firstAyaDetailSequenceNumberSeed) {
            result = readLastSavedPage();
        }

        if (result < 0 || result > ayaDetails.size() - 1) {
            result = 0;
        }

        return result;
    }

    private int readLastSavedPage() {
        return reminderActivity.getSharedPreferencesManager().findIntValue(SAVED_PAGE);
    }

    private int readSavedAyaDetailSequenceNumberSeed() {
        return reminderActivity.getSharedPreferencesManager().findIntValue(SAVED_AYA_DETAIL_SEQUENCE_NUMBER_SEED);
    }

    public int getFirstAyaDetailSequenceNumberSeed(List<AyaDetail> ayaDetails) {
        int result = -1;
        if (ayaDetails == null || ayaDetails.size() < 1) {
            return result;
        }
        if (ayaDetails.get(0) != null) {
            result = ayaDetails.get(0).getSequenceNumberSeed();
        }
        return result;
    }
}
