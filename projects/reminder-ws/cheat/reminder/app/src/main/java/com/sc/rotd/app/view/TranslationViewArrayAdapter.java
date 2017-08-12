package com.sc.rotd.app.view;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import com.sc.rotd.api.utils.CommonUtils;
import com.sc.rotd.app.R;
import com.sc.rotd.app.persistence.SharedPreferencesManager;
import com.sc.rotd.app.utils.CommonAndroidUtils;

import java.util.HashMap;
import java.util.Map;

public class TranslationViewArrayAdapter extends ArrayAdapter<String> {

    public static final String TRANSLATION_DISPLAY_NAME_PREFERENCE = "translation_display_name";
    public static final String DEFAULT_TRANSLATION = "English - Abdullah Yusuf Ali";

    private Context context;
    private String[] translationNames;
    private static Map<String, Integer> translationFlagsIds;
    private int translationSpinnerTextColor;
    private SharedPreferencesManager sharedPreferencesManager;
    private TranslationDialogFragment translationDialogFragment;

    static {
        translationFlagsIds = new HashMap<String, Integer>();
        translationFlagsIds.put("Bengali", R.drawable.flag_bangladesh);
        translationFlagsIds.put("English", R.drawable.flag_us);
        translationFlagsIds.put("French", R.drawable.flag_france);
        translationFlagsIds.put("German", R.drawable.flag_germany);
        translationFlagsIds.put("Hindi", R.drawable.flag_india);
        translationFlagsIds.put("Indonesian", R.drawable.flag_indonesia);
        translationFlagsIds.put("Persian", R.drawable.flag_iran);
        translationFlagsIds.put("Spanish", R.drawable.flag_spain);
        translationFlagsIds.put("Urdu", R.drawable.flag_pakistan);
    }


    public TranslationViewArrayAdapter(TranslationDialogFragment translationDialogFragment, String[] translationNames) {
        super(translationDialogFragment.getActivity(), R.layout.single_translation_row, translationNames);
        this.context = translationDialogFragment.getActivity();
        translationSpinnerTextColor = context.getResources().getColor(R.color.translation_spinner_text);
        this.translationNames = translationNames;
        sharedPreferencesManager = new SharedPreferencesManager(context);
        this.translationDialogFragment = translationDialogFragment;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        String selectedTranslationName = CommonAndroidUtils.translationNameFromSPM(sharedPreferencesManager);

        int selectedPosition = this.getPosition(selectedTranslationName);

        View singleRow = null;
        if (convertView == null) {

            LayoutInflater layoutInflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            singleRow = layoutInflater.inflate(R.layout.single_translation_row, parent, false);
        } else {
            singleRow = convertView;
        }

        final String translationName = translationNames[position];
        TextView translationNameView = null;
        if (CommonUtils.isNotBlank(translationName)) {
            translationNameView = (TextView) singleRow.findViewById(R.id.translation_name_view);
            translationNameView.setText(translationName);
            translationNameView.setTextColor(0xff000000);
            int flagImageId = findFlagImageIdByTranslationName(translationName);
            if (flagImageId > 0) {
                ImageView imageView = (ImageView) singleRow.findViewById(R.id.translation_country_flag_image);
                imageView.setImageResource(flagImageId);
            }
        }

        if (selectedPosition == position) {
            singleRow.setBackgroundResource(R.drawable.chapter_name_background);
            translationNameView.setTextColor(translationSpinnerTextColor);
        } else {
            singleRow.setBackgroundColor(0);
        }

        singleRow.setOnClickListener(new TranslationSelectListener(translationDialogFragment, translationName));

        return singleRow;
    }

    private Integer findFlagImageIdByTranslationName(String translationName) {
        if (CommonUtils.isBlank(translationName)) {
            return 0;
        }
        int translationTypeEndIndex = translationName.indexOf(' ');
        if (translationTypeEndIndex < 1) {
            return 0;
        }

        String translationType = translationName.substring(0, translationTypeEndIndex);
        if (CommonUtils.isBlank(translationType)) {
            return 0;
        }
        return translationFlagsIds.get(translationType);
    }

    @Override
    public int getCount() {
        return translationNames.length;
    }
}
