package com.sc.utlities;

import java.io.FileOutputStream;
import java.util.List;

import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

public class App {

	private static Font FONT = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD);

	public static void main(String[] args) throws Exception {

		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream("SpanishQuran.pdf"));
		document.open();

		URLReader urlReader = new URLReader();
		URLBuilder urlBuilder = new URLBuilder();
		SuraContent suraContent = new SuraContent();

		for (int i = 1; i < 115; i++) {
			String urlString = urlBuilder.build(i);
			StringBuffer htmlContent = urlReader.read(urlString);
			List<String> ayaList = suraContent.extract(htmlContent);

			StringBuffer suraBuff = new StringBuffer();

			suraBuff.append("############### Sura ");
			suraBuff.append(i);
			suraBuff.append(" ###############\n");
			for (int j = 0; j < ayaList.size(); j++) {
				suraBuff.append(j + 1);
				suraBuff.append(": ");
				suraBuff.append(ayaList.get(j));
				suraBuff.append("\n");
			}
			document.add(new Paragraph(suraBuff.toString(), FONT));
			System.out.println("Sura " + i + " written");
			document.newPage();
		}

		document.close();
	}
}
