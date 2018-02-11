package com.sc.dp.rides;

import com.sc.dp.mobility.MoveStrategy;

public class Vehicle {
    private String name;
    private MoveStrategy moveStrategy;

    public void travel() {
        moveStrategy.move();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public MoveStrategy getMoveStrategy() {
        return moveStrategy;
    }

    public void setMoveStrategy(MoveStrategy moveStrategy) {
        this.moveStrategy = moveStrategy;
    }
}
