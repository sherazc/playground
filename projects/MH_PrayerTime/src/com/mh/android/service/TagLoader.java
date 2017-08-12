package com.mh.android.service;

import java.util.ArrayList;
import java.util.List;

import android.content.Context;

import com.mh.android.R;
import com.mh.android.entity.Label;
import com.mh.android.entity.Tag;
import com.mh.android.entity.Time;

public class TagLoader {

	private Context context;

	public TagLoader(Context context) {
		this.context = context;
	}

	public List<Tag[]> loadTagRows(String data) {
		List<Tag[]> tagRows = new ArrayList<Tag[]>();

		String[] time1Row = this.getTagRow(data, R.array.time1);
		String[] time2Row = this.getTagRow(data, R.array.time2);
		String[] time3Row = this.getTagRow(data, R.array.time3);
		String[] time4Row = this.getTagRow(data, R.array.time4);
		String[] time5Row = this.getTagRow(data, R.array.time5);
		String[] time6Row = this.getTagRow(data, R.array.time6);
		String[] time7Row = this.getTagRow(data, R.array.time7);
		String[] time8Row = this.getTagRow(data, R.array.time8);

		addTagRow(tagRows, time1Row, Time.AM);
		addTagRow(tagRows, time2Row, Time.AM);
		addTagRow(tagRows, time3Row, Time.PM);
		addTagRow(tagRows, time4Row, Time.PM);
		addTagRow(tagRows, time5Row, Time.PM);
		addTagRow(tagRows, time6Row, Time.PM);
		addTagRow(tagRows, time7Row, Time.PM);
		addTagRow(tagRows, time8Row, Time.PM);
		return tagRows;
	}

	private void addTagRow(List<Tag[]> tagRows, String[] timeRow, int amPm) {
		if (timeRow == null || timeRow.length < 2) {
			return;
		}
		Tag tag1 = convertToTimeOrLabel(timeRow[0], amPm);
		Tag tag2 = convertToTimeOrLabel(timeRow[1], amPm);
		Tag tag3 = null;
		if (timeRow.length > 2) {
			tag3 = convertToTimeOrLabel(timeRow[2], amPm);
		}
		Tag[] tagRow = null;
		if (tag3 == null) {
			tagRow = new Tag[2];
		} else {
			tagRow = new Tag[3];
			tagRow[2] = tag3;
		}
		tagRow[0] = tag1;
		tagRow[1] = tag2;
		tagRows.add(tagRow);
	}

	private Tag convertToTimeOrLabel(String tagValue, int amPm) {
		if (StringUtils.isBlank(tagValue)) {
			return null;
		}
		int[] timeArray = getTime(tagValue, amPm);
		Tag tag = null;
		if (timeArray != null && timeArray.length > 2) {
			tag = new Time(timeArray[0], timeArray[1], timeArray[2]);
		} else {
			tag = new Label(tagValue);
		}
		return tag;
	}

	private int[] getTime(String tagValue, int amPm) {
		if (StringUtils.isBlank(tagValue)) {
			return null;
		}
		int indexOfColon = tagValue.indexOf(":");
		if (indexOfColon == -1) {
			return null;
		}
		String hourString = tagValue.substring(0, indexOfColon);
		String minString = tagValue.substring(indexOfColon + 1, indexOfColon + 3);
		return new int[] { StringUtils.parseInt(hourString), StringUtils.parseInt(minString), amPm };
	}

	private String[] getTagRow(String data, int arrayId) {
		String[] tagIds = this.context.getResources().getStringArray(arrayId);
		if (tagIds == null || tagIds.length < 1) {
			return null;
		}
		String[] result = new String[tagIds.length];
		int count = 0;
		for (String tagId : tagIds) {
			result[count++] = this.getTagValue(data, tagId);
		}

		return result;
	}

	private String getTagValue(String data, String tagId) {
		int startIndex = data.indexOf(tagId);
		startIndex = data.indexOf(">", startIndex) + 1;
		int endIndex = data.indexOf("<", startIndex);
		return data.substring(startIndex, endIndex);
	}
}
