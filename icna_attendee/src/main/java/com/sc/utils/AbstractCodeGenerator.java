package com.sc.utils;

import java.util.EnumMap;
import java.util.Map;

import com.google.zxing.EncodeHintType;

public abstract class AbstractCodeGenerator {

	public static String FILE_EXTENSION = "png";
	
	public static final Map<EncodeHintType, Object> commonEncodeingHints() {
		Map<EncodeHintType, Object> hints = new EnumMap<EncodeHintType, Object>(EncodeHintType.class);
		hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
		hints.put(EncodeHintType.MARGIN, 0); /* default = 4 */
		return hints;
	}
}
