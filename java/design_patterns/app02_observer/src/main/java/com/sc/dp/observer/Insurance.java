package com.sc.dp.observer;

public class Insurance implements Observer {
    private String insuranceType;

    public Insurance(String insuranceType) {
        this.insuranceType = insuranceType;
    }

    @Override
    public void update(String name) {
        System.out.println(insuranceType + " Insurance received = " + name);
    }
}
