package com.sc.spring3;

import com.sc.spring3.utils.BeanUtils;

public class StageMain {
	public static void main(String[] args) {
		Stage stage = (Stage) BeanUtils.getBean("theStage");
		stage.buildStage();
	}
}
