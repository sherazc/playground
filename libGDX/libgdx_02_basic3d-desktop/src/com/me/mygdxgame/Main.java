package com.me.mygdxgame;

import com.badlogic.gdx.backends.lwjgl.LwjglApplication;
import com.badlogic.gdx.backends.lwjgl.LwjglApplicationConfiguration;
import com.sun.xml.internal.bind.v2.model.impl.ModelBuilder;

public class Main {
	public static void main(String[] args) {
		LwjglApplicationConfiguration cfg = new LwjglApplicationConfiguration();
		cfg.title = "libgdx_02_basic3d";
		cfg.useGL20 = false;
		cfg.width = 480;
		cfg.height = 320;
		new LwjglApplication(new MyGdxGame(), cfg);
	}
}
