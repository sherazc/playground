package com.sc.libgdx;

import com.badlogic.gdx.ApplicationListener;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.graphics.GL10;
import com.badlogic.gdx.graphics.PerspectiveCamera;
import com.badlogic.gdx.graphics.g3d.Environment;
import com.badlogic.gdx.graphics.g3d.Model;
import com.badlogic.gdx.graphics.g3d.ModelBatch;
import com.badlogic.gdx.graphics.g3d.ModelInstance;
import com.badlogic.gdx.graphics.g3d.attributes.ColorAttribute;
import com.badlogic.gdx.graphics.g3d.environment.DirectionalLight;
import com.badlogic.gdx.graphics.g3d.utils.CameraInputController;
import com.badlogic.gdx.utils.Array;

// http://blog.xoppa.com/loading-models-using-libgdx/

public class MyGdxGame implements ApplicationListener {

	public PerspectiveCamera camera;
	public ModelBatch modelBatch;
	// public Model model;
	// public ModelInstance instance;
	public Environment environment;
	public CameraInputController cameraController;

	// If the models are huge then use AssetManger to load models;
	public AssetManager assets;
	public boolean loading;
	public Array<ModelInstance> instances = new Array<ModelInstance>();

	@Override
	public void create() {
		modelBatch = new ModelBatch();
		camera = new PerspectiveCamera(67, Gdx.graphics.getWidth(), Gdx.graphics.getHeight());
		camera.position.set(1f, 1f, 1f);
		camera.lookAt(0, 0, 0);
		camera.near = 0.1f;
		camera.far = 300f;
		camera.update();

		// if Models are not huge then use this method

		// ModelBuilder modelBuilder = new ModelBuilder();
		// model = modelBuilder.createBox(5f, 5f, 5f, new
		// Material(ColorAttribute.createDiffuse(Color.GREEN)),
		// Usage.Position | Usage.Normal);
		//
		// ModelLoader loader = new ObjLoader();
		// model = loader.loadModel(Gdx.files.internal("models/ship/ship.obj"));
		// instance = new ModelInstance(model);

		environment = new Environment();
		environment.set(new ColorAttribute(ColorAttribute.AmbientLight, 0.4f, 0.4f, 0.4f, 1));
		environment.add(new DirectionalLight().set(0.8f, 0.8f, 0.8f, -1f, -0.8f, -0.2f));
		cameraController = new CameraInputController(camera);
		Gdx.input.setInputProcessor(cameraController);

		assets = new AssetManager();
		assets.load("models/ship/ship.obj", Model.class);
		loading = true;
	}

	@Override
	public void dispose() {
		modelBatch.dispose();
		instances.clear();
		assets.dispose();

	}

	@Override
	public void render() {
		if (loading && assets.update()) {
			doneLoading();
		}
		cameraController.update();

		Gdx.gl.glViewport(0, 0, Gdx.graphics.getWidth(), Gdx.graphics.getHeight());
		Gdx.gl.glClear(GL10.GL_COLOR_BUFFER_BIT | GL10.GL_DEPTH_BUFFER_BIT);
		cameraController.update();
		modelBatch.begin(camera);
		modelBatch.render(instances, environment);
		modelBatch.end();
	}

	private void doneLoading() {
		Model ship = assets.get("models/ship/ship.obj", Model.class);
		ModelInstance shipInstance = new ModelInstance(ship);
		instances.add(shipInstance);
		loading = false;
	}

	@Override
	public void resize(int width, int height) {
	}

	@Override
	public void pause() {
	}

	@Override
	public void resume() {
	}
}
