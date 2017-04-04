package com.sc.spring3.spel;

import java.util.Properties;

public class InstrumentFilter {

	private Properties instruments;

	public Properties loadStringsInstruments() {
		return this.loadInstruments("Strings");
	}
	
	public Properties loadWindInstruments() {
		return this.loadInstruments("Wind");
	}
	
	public Properties loadSticksInstruments() {
		return this.loadInstruments("Sticks");
	}
	
	private Properties loadInstruments(String type) {
		Properties result = new Properties();
		if (instruments != null) {
			for (String key : instruments.stringPropertyNames()) {
				if (key.endsWith(type)) {
					result.setProperty(key, instruments.getProperty(key));
				}
			}
		}
		return result;
	}
	
	public Properties getInstruments() {
		return instruments;
	}

	public void setInstruments(Properties instruments) {
		this.instruments = instruments;
	}
}
