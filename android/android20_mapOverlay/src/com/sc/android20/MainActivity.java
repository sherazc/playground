package com.sc.android20;

import java.util.List;

import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.Window;

import com.google.android.maps.GeoPoint;
import com.google.android.maps.MapActivity;
import com.google.android.maps.MapController;
import com.google.android.maps.MapView;
import com.google.android.maps.Overlay;
import com.google.android.maps.OverlayItem;

public class MainActivity extends MapActivity {

	// got this latitude and longitude from http://itouchmap.com/latlong.html
	private static final int latitude = 34114274;
	private static final int longitude = -84262905;

	private MapView mapView;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.main);

		mapView = (MapView) findViewById(R.id.map_view);
		mapView.setBuiltInZoomControls(true);

		List<Overlay> mapOverlays = mapView.getOverlays();

		Drawable drawable = this.getResources().getDrawable(R.drawable.mnicon);

		CustomItemizedOverlay itemizedOverlay = new CustomItemizedOverlay(drawable, this);

		GeoPoint point = new GeoPoint(latitude, longitude);
		OverlayItem overlayItem = new OverlayItem(point, "Bethany Bend", "Her rasta Bethany Bend say jata hai");

		itemizedOverlay.addOverlay(overlayItem);
		mapOverlays.add(itemizedOverlay);

		MapController mapController = mapView.getController();

		mapController.animateTo(point);
		mapController.setZoom(20);

	}

	@Override
	protected boolean isRouteDisplayed() {
		return false;
	}
}