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
import com.sc.libgdx.GdxGame;
import com.sc.libgdx.tween.SpriteTween;

public class SplashScreen implements Screen {

	private GdxGame game;
	private Sprite splashSprite;
	private Texture splashTexture;
	private SpriteBatch batch;
	private TweenManager manager;
	
	public SplashScreen(GdxGame game) {
		this.game = game;
	}
	
	@Override
	public void render(float delta) {
		Gdx.gl.glClearColor(0, 0, 0, 1);
		Gdx.gl.glClear(GL10.GL_COLOR_BUFFER_BIT);
		manager.update(delta);
		batch.begin();
		splashSprite.draw(batch);
		batch.end();
	}

	@Override
	public void resize(int width, int height) {
	}

	@Override
	public void show() {
		splashTexture = new Texture("data/libgdx01.png");
		TextureRegion region = new TextureRegion(splashTexture, Gdx.graphics.getWidth(), Gdx.graphics.getHeight());
		splashTexture.setFilter(TextureFilter.Linear, TextureFilter.Linear);
		
		splashSprite = new Sprite(region);
		splashSprite.setColor(1,1,1,0);
		splashSprite.setX(0);
		splashSprite.setY(0);
		
		batch = new SpriteBatch();
		
		manager = new TweenManager();
		Tween.registerAccessor(Sprite.class, new SpriteTween());
		
		TweenCallback cb = new TweenCallback() {
			
			@Override
			public void onEvent(int type, BaseTween<?> source) {
				tweenCompleted();
				
			}
		};
		//splashSprite.
		Tween tween = Tween.to(splashSprite, SpriteTween.ALPHA, 3f);
		tween.target(1);
		tween.ease(TweenEquations.easeInQuad);
		tween.setCallback(cb);
		tween.setCallbackTriggers(TweenCallback.COMPLETE);
		tween.repeatYoyo(1, 2.5f);
		tween.start(manager);
	}

	private void tweenCompleted() {
		game.setScreen(new MainMenuScreen(game));
	}
	
	@Override
	public void hide() {
	}

	@Override
	public void pause() {
	}

	@Override
	public void resume() {
	}

	@Override
	public void dispose() {
	}

}
