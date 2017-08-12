package com.sc.bean;

import java.io.Serializable;

import javax.faces.event.ActionEvent;
import javax.faces.event.ValueChangeEvent;
import javax.faces.model.SelectItem;

public class ResumeBean implements Serializable {
	private String name = "";
	private String jobTitle = "";
	private String fgColor = "BLACK";
	private String bgColor = "WHITE";

	private SelectItem[] availableColorNames = { new SelectItem("BLACK"),
			new SelectItem("WHITE"), new SelectItem("SILVER"),
			new SelectItem("RED"), new SelectItem("GREEN"),
			new SelectItem("BLUE") };
	
	private SelectItem[] availableColorValues = { new SelectItem("#000000"),
			new SelectItem("#FFFFFF"), new SelectItem("#C0C0C0"),
			new SelectItem("#FF0000"), new SelectItem("#00FF00"),
			new SelectItem("#0000FF") };
	
	private boolean isColorSupported = true;
	private boolean isUsingColorName = true;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getJobTitle() {
		return jobTitle;
	}
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	public String getFgColor() {
		return fgColor;
	}
	public void setFgColor(String fgColor) {
		this.fgColor = fgColor;
	}
	public String getBgColor() {
		return bgColor;
	}
	public void setBgColor(String bgColor) {
		this.bgColor = bgColor;
	}
	public boolean isColorSupported() {
		return isColorSupported;
	}
	public void setColorSupported(boolean isColorSupported) {
		this.isColorSupported = isColorSupported;
	}
	public boolean isUsingColorName() {
		return isUsingColorName;
	}
	public void setUsingColorName(boolean isUsingColorName) {
		this.isUsingColorName = isUsingColorName;
	}
	public SelectItem[] getAvailableColors() {
		if (isUsingColorName) {
			return availableColorNames;
		} else {
			return availableColorValues;
		} 
	}
	
	public void toggleColorSupported(ActionEvent event) {
		isColorSupported = !isColorSupported;
	}
	
	public String getColorSupportLabel() {
		if (isColorSupported) {
			return "Disable Color Customization";
		} else {
			return "Enable Colors Customization";
		} 
	}
	
	public void changeColorMode(ValueChangeEvent event) {
		boolean flag = ((Boolean)event.getNewValue()).booleanValue();
		setUsingColorName(!flag);
	}
	
	public String showPreview() {
		if (isColorSupported && fgColor.equals(bgColor)) {
			return "same-color";
		} else {
			return "success";
		} 
	}
}
