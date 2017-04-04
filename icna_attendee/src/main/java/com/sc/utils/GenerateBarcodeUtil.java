package com.sc.utils;

import java.io.File;
import java.io.FileOutputStream;

import org.apache.commons.lang.StringUtils;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.oned.EAN8Writer;

public class GenerateBarcodeUtil extends AbstractCodeGenerator {

	private static final int CODE_LENGTH = 8;
	private static String FILE_PREFIX = "barcode_";

	public static final File generate(String code, int width, int height) {
		if (StringUtils.isBlank(code)) {
			return null;
		}
		if (code.length() < CODE_LENGTH) {
			code = StringUtils.rightPad(code, CODE_LENGTH, '0');
		} else {
			code = StringUtils.substring(code, 0, CODE_LENGTH);
		}
		File resultFile = null;
		try {
			File tmpDirectory = new File("/tmp");
			if (!tmpDirectory.exists()) {
				tmpDirectory.mkdir();
			}
			resultFile = new File(tmpDirectory, FILE_PREFIX + code + "." + FILE_EXTENSION);
			BitMatrix bitMatrix = new EAN8Writer().encode(code, BarcodeFormat.EAN_8, width, height, commonEncodeingHints());
			MatrixToImageWriter.writeToStream(bitMatrix, FILE_EXTENSION, new FileOutputStream(resultFile));

		} catch (Exception e) {
			e.printStackTrace();
			resultFile = null;
		}
		return resultFile;
	}
}
