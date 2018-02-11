package com.sc.dp.observable;

import com.sc.dp.observer.Observer;

import java.util.ArrayList;
import java.util.List;

public class Person implements Observable {
    private String name;
    private List<Observer> observers = new ArrayList<>();

    public Person(String name) {
        this.setName(name);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
        this.notifyObservers();
    }

    @Override
    public void addObserver(Observer observer) {
        this.observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        this.observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        this.observers.forEach(observer -> observer.update(this.name));
    }
}
