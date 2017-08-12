package com.sc.libgdx.screens;

import aurelienribon.tweenengine.BaseTween;
import aurelienribon.tweenengine.Tween;
import aurelienribon.tweenengine.TweenCallback;
import aurelienribon.tweenengine.TweenEquation;
import aurelienribon.tweenengine.TweenEquations;
import aurelienribon.tweenengine.TweenManager;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Screen;
import com.badlogic.gdx.graphics.GL10;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.Texture.TextureFilter;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.sc.libgdx.LibGdxMain;
import com.sc.libgdx.tween.SpriteTween;

public class SplashScreen implements Screen {

	private Texture splashTexture;
	private Sprite splashSprite;
	private SpriteBatch batch;
	private LibGdxMain game;
	private TweenManager manager;

	public SplashScreen(LibGdxMain game) {
		this.game = game;
	}

	@Override
	public void render(float delta) {
		// Gdx.app.log(LibGdxMain.LOG, "Rendering... " +
		// System.currentTimeMillis());
		Gdx.gl.glClearColor(0, 0, 0, 1);
		Gdx.gl.glClear(GL10.GL_COLOR_BUFFER_BIT);
		manager.update(delta);
		batch.begin();
		splashSprite.draw(batch);
		batch.end();
	}

	@Override
	public void resize(int width, int height) {
		// TODO Auto-generated method stub

	}

	@Override
	public void show() {
		splashTexture = new Texture("data/libgdx01.png");
		TextureRegion region = new TextureRegion(splashTexture, Gdx.graphics.getWidth(), Gdx.graphics.getHeight());
		splashTexture.setFilter(TextureFilter.Linear, TextureFilter.Linear);

		splashSprite = new Sprite(region);
		// Start with transparent color
		splashSprite.setColor(1, 1, 1, 0);
		// splashSprite.setX((Gdx.graphics.getWidth() / 2) -
		// (splashSprite.getWidth() / 2));
		// splashSprite.setY((Gdx.graphics.getHeight() / 2) -
		// (splashSprite.getHeight() / 2));
		splashSprite.setX(0);
		splashSprite.setY(0);

		// splashSprite.setOrigin(splashSprite.getWidth() / 2,
		// splashSprite.getHeight() / 2);
		// splashSprite.setPosition(Gdx.graphics.getWidth(),
		// Gdx.graphics.getHeight());

		batch = new SpriteBatch();
		Tween.registerAccessor(Sprite.class, new SpriteTween());
		manager = new TweenManager();

		TweenCallback cb = new TweenCallback() {

			public void onEvent(int type, BaseTween<?> source) {
				tweenCompleted();
			}
		};

		Tween tween = Tween.to(splashSprite, SpriteTween.ALPHA, 0.05f);
		tween.target(1);
		tween.ease(TweenEquations.easeInQuad);
		tween.setCallback(cb);
		tween.setCallbackTriggers(TweenCallback.COMPLETE);
		tween.repeatYoyo(1, 0.05f);
		tween.start(manager);
	}

	private void tweenCompleted() {
		game.setScreen(new MainMenu(game));

	}

	@Override
	public void hide() {
		// TODO Auto-generated method stub

	}

	@Override
	public void pause() {
		// TODO Auto-generated method stub

	}

	@Override
	public void resume() {
		// TODO Auto-generated method stub

	}

	@Override
	public void dispose() {
		// TODO Auto-generated method stub

	}

}
