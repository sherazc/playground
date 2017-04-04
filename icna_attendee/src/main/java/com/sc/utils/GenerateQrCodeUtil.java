package com.sc.utils;

import java.io.File;
import java.io.FileOutputStream;

import org.apache.commons.lang.StringUtils;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

public class GenerateQrCodeUtil extends AbstractCodeGenerator {

	private static String FILE_PREFIX = "qrcode_";
	
	public static final File generate(String code, String firstName, String lastName, String street, String city,
			String state, String zipCode, String phone, int size) {
		File resultFile = null;
		try {
			File tmpDirectory = new File("/tmp");
			if (!tmpDirectory.exists()) {
				tmpDirectory.mkdir();
			}
			StringBuilder qrData = new StringBuilder("MECARD:");
			qrData.append("N:");
			qrData.append(StringUtils.defaultString(firstName));
			qrData.append(" ");
			qrData.append(StringUtils.defaultString(lastName));
			qrData.append(";ADR:");
			qrData.append(StringUtils.defaultString(street));
			qrData.append(", ");
			qrData.append(StringUtils.defaultString(city));
			qrData.append(", ");
			qrData.append(StringUtils.defaultString(state));
			qrData.append(", ");
			qrData.append(StringUtils.defaultString(zipCode));
			qrData.append(";TEL:");
			qrData.append(StringUtils.defaultString(phone));
			qrData.append(";ORG:ICNA");
			qrData.append(";NOTE:");
			qrData.append(StringUtils.defaultString(code));
			qrData.append(";");
//			StringBuilder qrData = new StringBuilder("BEGIN:VCARD");
//			qrData.append("\nVERSION:3.0");
//			qrData.append("\nN:");
//			qrData.append(StringUtils.defaultString(lastName));
//			qrData.append(";");
//			qrData.append(StringUtils.defaultString(firstName));
//			qrData.append("\nADR;HOME:;;");
//			qrData.append(StringUtils.defaultString(street));
//			qrData.append(";");
//			qrData.append(StringUtils.defaultString(city));
//			qrData.append(";");
//			qrData.append(StringUtils.defaultString(state));
//			qrData.append(";");
//			qrData.append(StringUtils.defaultString(zipCode));
//			qrData.append("\nTEL;HOME;VOICE:");
//			qrData.append(StringUtils.defaultString(phone));
//			qrData.append("\nORG:ICNA");
//			qrData.append("\nEND:VCARD");

			resultFile = new File(tmpDirectory, FILE_PREFIX + code + "." + FILE_EXTENSION);
			BitMatrix bitMatrix = new QRCodeWriter().encode(qrData.toString(), BarcodeFormat.QR_CODE, size, size, commonEncodeingHints());
			MatrixToImageWriter.writeToStream(bitMatrix, FILE_EXTENSION, new FileOutputStream(resultFile));

		} catch (Exception e) {
			e.printStackTrace();
			resultFile = null;
		}
		return resultFile;
	}
	

}
