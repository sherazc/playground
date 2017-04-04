package com.sc.utils;


public class GenerateBarcodeExample {
	public static void main(String[] args) {
		String code = ""+ (int) (Math.random() * 100000000);
		System.out.println(GenerateBarcodeUtil.generate(code, 100, 50));
		
		System.out.println(GenerateQrCodeUtil.generate(code, "fname1", "lastname1", "123 st", "City1", "ST", "10001", "(800) 123-4567", 200));
	}
}
