package com.sc.async.eg09_timer;

import java.util.Timer;
import java.util.TimerTask;

import com.sc.async.common.MyThreadUtils;

public class App {
    public static void main(String[] args) {
        TimerTask task1 = new MyTimerTask("Task 1");
        TimerTask task2 = new MyTimerTask("Task 2");

        // Run it in demon only once after 1 second
        Timer timer1 = new Timer(true);
        timer1.schedule(task1, 1000);

        // Run it after 0 second and continue to run every 1 second
        Timer timer2 = new Timer(true);
        timer2.schedule(task2, 0, 1000);

        // Main Thread sleep for 5 second
        MyThreadUtils.sleep(5000);
        timer1.cancel();
        timer2.cancel();
    }
}

// Can not use lambda because TimerTask is an abstract class
class MyTimerTask extends TimerTask {
    private String name;

    MyTimerTask(String name) {
        this.name = name;
    }

    @Override
    public void run() {
        System.out.println(name + " " + Thread.currentThread().getName());
    }
}
