package com.sc.print;

import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.geom.AffineTransform;
import java.awt.print.Book;
import java.awt.print.PageFormat;
import java.awt.print.Paper;
import java.awt.print.Printable;
import java.awt.print.PrinterException;
import java.awt.print.PrinterJob;

public class ImagePrinter implements Printable {

	private Image image;

	public static void printImage(Image aImage) throws PrinterException {
		new ImagePrinter(aImage).print();
	}

	public ImagePrinter(Image aImage) {
		image = aImage;
	}

	public void print() throws PrinterException {
		PrinterJob pPrinterJob = PrinterJob.getPrinterJob();
		if (pPrinterJob.printDialog()) {
			PageFormat pPageFormat = pPrinterJob.defaultPage();
			Paper pPaper = pPageFormat.getPaper();
			pPaper.setImageableArea(1.0, 1.0, pPaper.getWidth() - 2.0, pPaper.getHeight() - 2.0);
			pPageFormat.setPaper(pPaper);
			pPageFormat = pPrinterJob.pageDialog(pPageFormat);
			Book pBook = new Book();
			pBook.append(this, pPageFormat);
			pPrinterJob.setPageable(pBook);
			pPrinterJob.print();
		}
	}

	public int print(Graphics g, PageFormat aPageFormat, int aPageIndex) {

		if (aPageIndex > 0) {
			return NO_SUCH_PAGE;
		}

		Graphics2D g2d = (Graphics2D) g;
		AffineTransform pOrigTransform = g2d.getTransform();

		g2d.translate(aPageFormat.getImageableX(), aPageFormat.getImageableY());
		g2d.drawImage(image, 0, 0, null);

		g2d.setTransform(pOrigTransform);
		return PAGE_EXISTS;
	}
}