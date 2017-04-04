package com.sc.spring3.spel;

import com.sc.spring3.utils.BeanUtils;

public class SongMain {
	public static void main(String[] args) {
		Song songA = (Song) BeanUtils.getBean("songA");
		Song songB = (Song) BeanUtils.getBean("songB");
		Song songC = (Song) BeanUtils.getBean("songC");
		
		songA.playSong();
		songB.playSong();
		songC.playSong();
	}
}
