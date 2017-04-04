package com.sc.libgdx.tween;

import com.badlogic.gdx.graphics.g2d.Sprite;

import aurelienribon.tweenengine.TweenAccessor;

public class SpriteTween implements TweenAccessor<Sprite> {

	public static final int ALPHA = 101;

	@Override
	public int getValues(Sprite target, int tweenType, float[] returnValues) {
		int tweenFlag = 0;
		if (tweenType == ALPHA) {
			tweenFlag = 1;
			returnValues[0] = target.getColor().a;
		} else {
			tweenFlag = 0;
		}
		return tweenFlag;
	}

	@Override
	public void setValues(Sprite target, int tweenType, float[] newValues) {
		if (tweenType == ALPHA) {
			target.setColor(1, 1, 1, newValues[0]);
		}

	}

}
