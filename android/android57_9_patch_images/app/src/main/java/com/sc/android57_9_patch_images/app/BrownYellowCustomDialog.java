package com.sc.android57_9_patch_images.app;

import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.Window;
import com.sc.util.CommonUtils;

/**
 * Created by SherazD on 4/12/2015.
 */
public class BrownYellowCustomDialog extends Dialog {
    public BrownYellowCustomDialog(Context context) {
        super(context);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.dialog_brown_yellow);

        View dialogYellowBrownView = findViewById(R.id.dialog_yellow_brown);
        dialogYellowBrownView.setOnTouchListener(new CloseGraphicTouchListener(this, 255, 0, 300, 40));

    }
}

class CloseGraphicTouchListener implements View.OnTouchListener {

    private Dialog dialog;
    private int startX;
    private int startY;
    private int endX;
    private int endY;

    public CloseGraphicTouchListener(Dialog dialog, int startX, int startY, int endX, int endY) {
        this.dialog = dialog;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    }

    @Override
    public boolean onTouch(View v, MotionEvent event) {
        boolean tappedOnClose = isTappedOnClose(event.getX(), event.getY());

        Log.d("Dialog", "tappedOnClose=" + tappedOnClose);
        if (tappedOnClose) {
            dialog.dismiss();
        }

        return false;
    }

    private boolean isTappedOnClose(float x, float y) {
        int xDp = CommonUtils.pxToDp((int) x);
        int yDp = CommonUtils.pxToDp((int) y);
        return xDp > startX && xDp < endX && yDp > startY && yDp < endY;
    }


}
