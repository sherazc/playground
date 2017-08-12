package com.sc.print;

/*
 * Copyright (c) 1995, 2008, Oracle and/or its affiliates. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 *   - Neither the name of Oracle or the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import java.applet.Applet;
import java.awt.BasicStroke;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Rectangle;
import java.awt.Shape;
import java.awt.Stroke;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.print.Book;
import java.awt.print.PageFormat;
import java.awt.print.Paper;
import java.awt.print.Printable;
import java.awt.print.PrinterException;
import java.awt.print.PrinterJob;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.UIManager;

public class HelloWorldPrinter implements Printable, ActionListener {

	public int print(Graphics g, PageFormat pf, int page) throws PrinterException {

		if (page > 0) { /* We have only one page, and 'page' is zero-based */
			return NO_SUCH_PAGE;
		}

		/*
		 * User (0,0) is typically outside the imageable area, so we must
		 * translate by the X and Y values in the PageFormat to avoid clipping
		 */
		Graphics2D g2d = (Graphics2D) g;
		g2d.translate(pf.getImageableX(), pf.getImageableY());

		/* Now we perform our rendering */
		// Dialog
		// DialogInput
		// Monospaced
		// Serif
		// SansSerif
		Image image = new ImageIcon("pic.jpg").getImage();
		g.drawImage(image, 0, 0, null);

		g.setFont(new Font("SansSerif", Font.BOLD, 15));
		g.drawString("Name:", 10, 100);

		g.setFont(new Font("SansSerif", Font.PLAIN, 12));
		g.drawString("Sheraz", 70, 100);
		//g2d.draw(new Rectangle(10, 10, 170, 100));
		g2d.setStroke(new BasicStroke (7.0F, BasicStroke.CAP_ROUND, 
                BasicStroke.JOIN_ROUND));
		g2d.drawRect(10, 10, 170, 100);

		/* tell the caller that this page is part of the printed document */
		return PAGE_EXISTS;
	}

	public void actionPerformed(ActionEvent e) {
		PrinterJob job = PrinterJob.getPrinterJob();
		// job.setPrintable(this);
		try {

			if (job.printDialog()) {
				PageFormat pPageFormat = job.defaultPage();
				Paper pPaper = pPageFormat.getPaper();
				pPaper.setSize(200, 120);
				pPaper.setImageableArea(1.0, 1.0, pPaper.getWidth() - 2.0, pPaper.getHeight() - 2.0);
				pPageFormat.setPaper(pPaper);
				pPageFormat = job.pageDialog(pPageFormat);
				Book pBook = new Book();
				pBook.append(this, pPageFormat);
				job.setPageable(pBook);
				job.print();
			}

			// job.print();
		} catch (PrinterException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		// boolean ok = job.printDialog();
		// if (ok) {
		// try {
		// job.print();
		// } catch (PrinterException ex) {
		// /* The job did not successfully complete */
		// }
		// }
	}

	public static void main(String args[]) {

		UIManager.put("swing.boldMetal", Boolean.FALSE);
		JFrame f = new JFrame("Hello World Printer");

		f.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				System.exit(0);
			}
		});
		JButton printButton = new JButton("Print Hello World");
		printButton.addActionListener(new HelloWorldPrinter());
		f.add("Center", printButton);
		f.pack();
		f.setVisible(true);
	}
}
