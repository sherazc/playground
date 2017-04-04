package com.sc.bean;

import java.io.Serializable;

import javax.faces.event.ActionEvent;
import javax.faces.event.ValueChangeEvent;
import javax.faces.model.SelectItem;

public class ResumeBean implements Serializable {

	private static final long serialVersionUID = 1L;
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
	private boolean isUsingColorNames = true;

	public String getName() {
		return (name);
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getJobTitle() {
		return (jobTitle);
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getFgColor() {
		return (fgColor);
	}

	public void setFgColor(String fgColor) {
		this.fgColor = fgColor;
	}

	public String getBgColor() {
		return (bgColor);
	}

	public void setBgColor(String bgColor) {
		this.bgColor = bgColor;
	}

	public SelectItem[] getAvailableColors() {
		if (isUsingColorNames) {
			return (availableColorNames);
		} else {
			return (availableColorValues);
		}
	}

	public boolean isColorSupported() {
		return (isColorSupported);
	}

	public void toggleColorSupport(ActionEvent event) {
		isColorSupported = !isColorSupported;
	}

	public String getColorSupportLabel() {
		if (isColorSupported) {
			return ("Disable Color Customization");
		} else {
			return ("Enable Colors Customization");
		}
	}

	public boolean isUsingColorNames() {
		return (isUsingColorNames);
	}

	public void setUsingColorNames(boolean isUsingColorNames) {
		this.isUsingColorNames = isUsingColorNames;
	}

	public void changeColorMode(ValueChangeEvent event) {
		boolean flag = ((Boolean) event.getNewValue()).booleanValue();
		setUsingColorNames(!flag);
	}

	public String showPreview() {
		if (isColorSupported && fgColor.equals(bgColor)) {
			return ("same-color");
		} else {
			return ("success");
		}
	}

}
