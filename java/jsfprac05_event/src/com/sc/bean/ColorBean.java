package com.sc.bean;

import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.servlet.http.HttpServletRequest;

public class ColorBean {
	private String bgColor = "WHITE";

	public String getBgColor() {
		return bgColor;
	}

	public void setBgColor(String bgColor) {
		this.bgColor = bgColor;
	}

	public void selectGrayLevel(ActionEvent event) {
		FacesContext context = FacesContext.getCurrentInstance();
		String clientId = event.getComponent().getClientId(context);

		HttpServletRequest request = (HttpServletRequest) context.getExternalContext().getRequest();

		String grayLevelString = request.getParameter(clientId + ".x");
		int grayLevel = 220;

		try {
			grayLevel = Integer.parseInt(grayLevelString);
		} catch (NumberFormatException e) {
		}
		grayLevel = (256 * grayLevel) / 440;
		String rVal = Integer.toString(grayLevel, 16);
		this.setBgColor("#" + rVal + rVal + rVal);

	}

	public String showPreview() {
		return "success";
	}
}
