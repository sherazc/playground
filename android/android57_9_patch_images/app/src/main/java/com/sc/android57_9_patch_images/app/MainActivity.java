package com.sc.android57_9_patch_images.app;

import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.View;


public class MainActivity extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void textChatBubble(View view) {
        startActivity(new Intent(this, TextChatBubble.class));
    }

    public void layout9Patch(View view) {
        startActivity(new Intent(this, Layout9Patch.class));
    }

    public void brownYellowDialog(View view) {
        BrownYellowCustomDialog brownYellowCustomDialog = new BrownYellowCustomDialog(this);
        brownYellowCustomDialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        brownYellowCustomDialog.show();
    }

    public void greenDropDown(View view) {
        startActivity(new Intent(this, GreenDropDown.class));
    }
}
