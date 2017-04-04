package com.sc.utlities;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;

public class SuraContent {

	private static final String SURA_START_POINTER = "<table class=MsoTableGrid";
	private static final String SURA_END_POINTER = "</table>";
	private static final String ARABIC_AYA_START_POINTER = "<p dir=RTL style='text-align:justify;direction:rtl;unicode-bidi:embed'>";
	private static final String ARABIC_AYA_END_POINTER = "</p>";
	private static final String AYA_START_POINTER = "    Arial'>";
	private static final String AYA_END_POINTER = "</span></p>    </td>";

	public List<String> extract(StringBuffer fullContent) {
		if (fullContent == null || fullContent.length() < 1) {
			return null;
		}
		StringBuffer content = new StringBuffer();

		int suraStartIndex = StringUtils.indexOf(fullContent.toString(), SURA_START_POINTER);
		// fullContent.indexOf(SURA_START_POINTER);
		int suraEndIndex = StringUtils.indexOf(fullContent.toString(), SURA_END_POINTER, suraStartIndex);

		if (suraStartIndex < 1 || suraEndIndex < 1) {
			return null;
		}

		String suraContentTable = fullContent.substring(suraStartIndex, suraEndIndex + SURA_END_POINTER.length());

		return getAyaList(suraContentTable);
	}

	private List<String> getAyaList(String suraContent) {
		List<String> ayaList = new ArrayList<String>();
		int currentIndex = 0;
		int ayaEndIndex = 0;
		String aya = null;
		while ((currentIndex = StringUtils.indexOf(suraContent, AYA_START_POINTER, currentIndex)) != -1) {
			currentIndex += AYA_START_POINTER.length();
			ayaEndIndex = StringUtils.indexOf(suraContent, AYA_END_POINTER, currentIndex);
			aya = suraContent.substring(currentIndex, ayaEndIndex);
			aya = aya.replaceAll("\\s+", " ");
			aya = aya.replaceAll("\\<.*?\\>", "").trim();
			aya = StringEscapeUtils.unescapeHtml(aya);
			ayaList.add(aya);
			currentIndex = ayaEndIndex + AYA_END_POINTER.length();
		}
		return ayaList;
	}

	private int getArabicAyaStartIndex(String suraContentTable) {
		return StringUtils.indexOf(suraContentTable, ARABIC_AYA_START_POINTER);
	}

	private StringBuffer filterArabicAyas(String suraContentTable) {
		StringBuffer result = new StringBuffer();
		StringBuffer suraContentTableBuffer = new StringBuffer(suraContentTable);

		int currentIndex = 0;
		int lastCurrentIndex = 0;
		while ((currentIndex = StringUtils.indexOf(suraContentTable, ARABIC_AYA_START_POINTER, currentIndex)) != -1) {
			result.append(suraContentTable.substring(lastCurrentIndex, currentIndex));
			lastCurrentIndex = currentIndex = StringUtils.indexOf(suraContentTable, ARABIC_AYA_END_POINTER,
					currentIndex) + ARABIC_AYA_END_POINTER.length();
		}
		return result;
	}

}
