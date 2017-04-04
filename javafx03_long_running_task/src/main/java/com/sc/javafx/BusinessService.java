package com.sc.javafx;

import java.util.Date;

public class BusinessService {

    private long delayMilli;


    public BusinessService(long delayMilli) {
        this.delayMilli = delayMilli;
    }

    public String callBusinessLogic(String seed) {
        try {
            synchronized (this){
                this.wait(delayMilli);
            }
            //Thread.sleep(delayMilli);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "Seed: " + seed + " " + new Date().toString();
    }

}
