package com.sc.dp;

import com.sc.dp.observable.Person;
import com.sc.dp.observer.Insurance;
import com.sc.dp.observer.Observer;
import com.sc.dp.observer.PostMail;

public class App {
    public static void main( String[] args ) {
        // Creating all Observer
        Observer autoInsuranceObserver = new Insurance("Auto");
        Observer homeInsuranceObserver = new Insurance("Home");
        Observer postMail = new PostMail();

        // Creating Subject
        Person person = new Person("Sheraz");

        // Adding Observer to Subject/Observable
        person.addObserver(autoInsuranceObserver);
        person.addObserver(homeInsuranceObserver);
        person.addObserver(postMail);

        // Updating person. This will notify all Observer.
        person.setName("Tariq");

        // Removing an Observer from Subject/Observable
        person.removeObserver(autoInsuranceObserver);

        // Updating person. This will notify all Observer.
        person.setName("Chaudhry");
    }
}
