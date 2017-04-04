package com.sc.print;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.net.URL;
 
import javax.print.Doc;
import javax.print.DocFlavor;
import javax.print.DocPrintJob;
import javax.print.PrintException;
import javax.print.PrintService;
import javax.print.PrintServiceLookup;
import javax.print.SimpleDoc;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.PrintRequestAttributeSet;
import javax.print.attribute.standard.Copies;
import javax.print.attribute.standard.Sides;
 
public class PrintPS {
 
  public static void main(String args[]) throws Exception {
	  
    FileInputStream textStream = new FileInputStream("text.txt");
    
    DocFlavor myFormat = DocFlavor.INPUT_STREAM.AUTOSENSE;
    Doc myDoc = new SimpleDoc(textStream, myFormat, null); 
   
    PrintRequestAttributeSet aset = new HashPrintRequestAttributeSet(); 
   
    aset.add(new Copies(1)); 
    aset.add(Sides.ONE_SIDED); 
   
    PrintService printService = PrintServiceLookup.lookupDefaultPrintService();
   
    System.out.println("Printing to default printer: " + printService.getName());
   
    DocPrintJob job = printService.createPrintJob(); 
    job.print(myDoc, aset); 
 
  }
}