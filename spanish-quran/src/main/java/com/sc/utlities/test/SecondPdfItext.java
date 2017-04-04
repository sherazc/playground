package com.sc.utlities.test;

import java.io.FileOutputStream;

import org.apache.commons.lang.StringEscapeUtils;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

public class SecondPdfItext {

	private static Font catFont = new Font(Font.FontFamily.COURIER, 18, Font.BOLD);
	private static Font redFont = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL, BaseColor.RED);
	private static Font subFont = new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.BOLD);
	private static Font smallBold = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD);

	public static void main(String[] args) throws Exception {
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream("FirstPdf.pdf"));
		document.open();

		Paragraph paragraph1 = new Paragraph("Some \u00e2 Text <h1>More\nText</h1>", catFont);
		document.add(paragraph1);
		
		Paragraph paragraph2 = new Paragraph(StringEscapeUtils.unescapeHtml("Some \u0626 \u004a &quot;bread&quot; ئ ñ Text\nMore Text"));
		document.add(paragraph2);

		Paragraph paragraph3 = new Paragraph("Alif. Lâm. Mîm. [Éstas son", catFont);
		document.add(paragraph3);
		
		document.close();
	}

	private static void addEmptyLine(Paragraph paragraph, int number) {
		for (int i = 0; i < number; i++) {
			paragraph.add(new Paragraph(" "));
		}
	}
}
