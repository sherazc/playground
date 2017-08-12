package com.sc.services;

import java.awt.BasicStroke;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.geom.Rectangle2D;
import java.awt.print.Book;
import java.awt.print.PageFormat;
import java.awt.print.Paper;
import java.awt.print.Printable;
import java.awt.print.PrinterException;
import java.awt.print.PrinterJob;
import java.io.File;
import java.io.Serializable;
import java.net.URL;

import javax.inject.Inject;
import javax.inject.Named;
import javax.swing.ImageIcon;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Component;

import com.sc.dao.StateDao;
import com.sc.domain.Attendee;
import com.sc.utils.GenerateBarcodeUtil;
import com.sc.utils.GenerateQrCodeUtil;

@Component("attendeePrintService")
public class AttendeePrintService implements Printable, Runnable, Serializable {

	private static final long serialVersionUID = 1L;
	private static final String LABLE_TITLE = "19th SE ICNA Convention";
	private static final int PAGE_WIDTH = 230;
	private static final int PAGE_HEIGHT = 150;
	private static final int PAGE_BORDER_MARGIN = 10;

	private Attendee attendeeTarget;
	// http://stackoverflow.com/questions/1055851/how-do-you-draw-a-string-centered-vertically-in-java
	@Inject
	@Named("stateStaticContext")
	private StateDao stateDao;

	public void print(Attendee attendee) {
		this.attendeeTarget = attendee;
		Thread printThread = new Thread(this);
		printThread.start();
	}

	private PrinterJob setupPrinterJob(int width, int height) {
		PrinterJob printerJob = PrinterJob.getPrinterJob();
		PageFormat pageFormat = printerJob.defaultPage();
		Paper paper = pageFormat.getPaper();
		paper.setSize(width, height);
		paper.setImageableArea(0, 0, paper.getWidth(),
				paper.getHeight());
		pageFormat.setPaper(paper);
		pageFormat = printerJob.pageDialog(pageFormat);
		Book book = new Book();
		book.append(this, pageFormat);
		printerJob.setPageable(book);
		return printerJob;
	}

	@Override
	public int print(Graphics graphics, PageFormat pageFormat, int pageIndex)
			throws PrinterException {
		if (pageIndex > 0) { /* We have only one page, and 'page' is zero-based */
			return NO_SUCH_PAGE;
		}

		/*
		 * User (0,0) is typically outside the imageable area, so we must
		 * translate by the X and Y values in the PageFormat to avoid clipping
		 */
		Graphics2D graphics2d = (Graphics2D) graphics;
		graphics2d.translate(pageFormat.getImageableX() - 10,
				pageFormat.getImageableY());

		try {
			Image borderCornerTopLeft = new ImageIcon(getClass().getResource("/cornor1_top_left.png")).getImage();
			graphics.drawImage(borderCornerTopLeft, 10, 10, 45, 45, null);
			
			Image borderCornerTopRight = new ImageIcon(getClass().getResource("/cornor1_top_right.png")).getImage();
			graphics.drawImage(borderCornerTopRight, 175, 10, 45, 45, null);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		File barCodeFile = GenerateBarcodeUtil.generate("" + this.attendeeTarget.getId(), 200, 80);
		Image barCodeImage = new ImageIcon(barCodeFile.getAbsolutePath()).getImage();
		graphics.drawImage(barCodeImage, 10, 108, 50, 20, null);
		
		graphics.setFont(new Font("SansSerif", Font.BOLD, 7));
		graphics.drawString("" + this.attendeeTarget.getId(), 21, 134);
		
		File qaCodeFile = GenerateQrCodeUtil.generate("1", "fname1", "lastname1", "123 st", "City1", "ST", "10001", "(800) 123-4567", 200);
		Image qrCodeImage = new ImageIcon(qaCodeFile.getAbsolutePath()).getImage();
		graphics.drawImage(qrCodeImage, 180, 100, 30, 30, null);
		
		
		
		/* Now we perform our rendering */
		// Dialog
		// DialogInput
		// Monospaced
		// Serif
		// SansSerif
		// Image image = new ImageIcon("pic.jpg").getImage();
		// graphics.drawImage(image, 0, 0, null);

		graphics.setFont(new Font("SansSerif", Font.BOLD, 16));
		graphics.drawString(LABLE_TITLE, getPageCenterJustifiedX(graphics, PAGE_WIDTH, LABLE_TITLE), 50);

		graphics.setFont(new Font("SansSerif", Font.BOLD, 20));
		String name = this.getName(attendeeTarget);
		graphics.drawString(name, getPageCenterJustifiedX(graphics, PAGE_WIDTH, name), 80);

		// String city = this.getCityName(attendeeTarget);
		// String stateZip = this.getAddress(attendeeTarget);
		// if (StringUtils.isNotBlank(city) && StringUtils.isNotBlank(stateZip))
		// {
		// graphics.setFont(new Font("SansSerif", Font.PLAIN, 14));
		// graphics.drawString(city, 20, 80);
		// graphics.setFont(new Font("SansSerif", Font.PLAIN, 14));
		// graphics.drawString(stateZip, 20, 95);
		// }
		//
		// if (StringUtils.isBlank(city) && StringUtils.isNotBlank(stateZip)) {
		// graphics.setFont(new Font("SansSerif", Font.PLAIN, 14));
		// graphics.drawString(stateZip, 20, 80);
		// }
		//
		// if (StringUtils.isNotBlank(city) && StringUtils.isBlank(stateZip)) {
		// graphics.setFont(new Font("SansSerif", Font.PLAIN, 14));
		// graphics.drawString(city, 20, 80);
		// }

		String address = this.getAddress(attendeeTarget);
		if (StringUtils.isNotBlank(address)) {
			graphics.setFont(new Font("SansSerif", Font.PLAIN, 14));
			graphics.drawString(address, getPageCenterJustifiedX(graphics, PAGE_WIDTH, address), 100);
		}

		
		// g2d.draw(new Rectangle(10, 10, 170, 100));
		graphics2d.setStroke(new BasicStroke(2.0F, BasicStroke.CAP_ROUND,
				BasicStroke.JOIN_ROUND));
		graphics2d.drawRect(PAGE_BORDER_MARGIN, PAGE_BORDER_MARGIN, PAGE_WIDTH
				- PAGE_BORDER_MARGIN * 2, PAGE_HEIGHT - PAGE_BORDER_MARGIN * 2);

		/*
		graphics2d.setStroke(new BasicStroke(1.0F, BasicStroke.CAP_ROUND,
				BasicStroke.JOIN_ROUND));
		int innerBorderMargin = PAGE_BORDER_MARGIN + 4;
		graphics2d.drawRect(innerBorderMargin, innerBorderMargin, PAGE_WIDTH
				- innerBorderMargin * 2, PAGE_HEIGHT - innerBorderMargin * 2);
		*/
		/* tell the caller that this page is part of the printed document */
		return PAGE_EXISTS;
	}

	private int getPageCenterJustifiedX(Graphics graphics, int pageWidth,
			String string) {
		FontMetrics fontMatrix = graphics.getFontMetrics();
		Rectangle2D rect = fontMatrix.getStringBounds(string, graphics);
		double width = rect.getWidth();
		return (int) ((pageWidth - width) / 2);
	}

	private String getName(Attendee attendee) {
		String name = "";
		if (StringUtils.isNotBlank(attendee.getFirstName())) {
			name += attendee.getFirstName();
			name += " ";
		}
		if (StringUtils.isNotBlank(attendee.getLastName())) {
			name += attendee.getLastName();
		}
		return name;
	}

	private String getAddress(Attendee attendee) {
		String address = "";
		if (StringUtils.isNotBlank(attendee.getCity())) {
			address += attendee.getCity();
			address += ", ";
		}
		String stateDisplayName = attendee.getState();
		if (StringUtils.isNotBlank(stateDisplayName)) {
			address += stateDisplayName;
			// address += " ";
		}
		// if (StringUtils.isNotBlank(attendee.getZipCode())) {
		// address += attendee.getZipCode();
		// }
		return address;
	}

	private String getCityName(Attendee attendee) {
		String cityName = null;
		if (StringUtils.isNotBlank(attendee.getCity())) {
			cityName = attendee.getCity();
			cityName += ",";
		}
		return cityName;
	}

	private String getStateZip(Attendee attendee) {
		String stateZip = "";
		String stateDisplayName = this.getStateDao()
				.getDisplayNameByAbbreviation(attendee.getState());
		if (StringUtils.isNotBlank(stateDisplayName)) {
			stateZip += stateDisplayName;
			stateZip += " ";
		}
		if (StringUtils.isNotBlank(attendee.getZipCode())) {
			stateZip += attendee.getZipCode();
		}
		return stateZip;
	}

	public Attendee getAttendeeTarget() {
		return attendeeTarget;
	}

	public void setAttendeeTarget(Attendee attendeeTarget) {
		this.attendeeTarget = attendeeTarget;
	}

	public StateDao getStateDao() {
		return stateDao;
	}

	public void setStateDao(StateDao stateDao) {
		this.stateDao = stateDao;
	}

	@Override
	public void run() {
		PrinterJob printerJob = this.setupPrinterJob(PAGE_WIDTH, PAGE_HEIGHT);
		try {
			// if (printerJob.printDialog()) {
			printerJob.print();
			// }
		} catch (PrinterException e1) {
			e1.printStackTrace();
		}
	}
}
