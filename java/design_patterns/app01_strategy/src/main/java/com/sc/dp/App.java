package com.sc.dp;

import com.sc.dp.mobility.DriveStrategy;
import com.sc.dp.mobility.FlyStrategy;
import com.sc.dp.mobility.MoveStrategy;
import com.sc.dp.rides.Vehicle;

public class App
{
    public static void main( String[] args ) {
        // Creating Strategy/Behaviors
        MoveStrategy flyStrategy = new FlyStrategy();
        MoveStrategy driveStrategy = new DriveStrategy();

        // Creating Objects
        Vehicle car = new Vehicle();
        car.setName("Toyota");

        Vehicle plane = new Vehicle();
        plane.setName("Delta");

        // Composing Strategy
        car.setMoveStrategy(driveStrategy);
        plane.setMoveStrategy(flyStrategy);

        System.out.println(car.getName());
        car.travel();

        System.out.println(plane.getName());
        plane.travel();

        // Benefit of Strategy. Changing on runtime
        System.out.println("Landing " + plane.getName());
        plane.setMoveStrategy(driveStrategy);

        System.out.println(plane.getName());
        plane.travel();


    }
}
