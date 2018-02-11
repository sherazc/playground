package com.sc.dp.observable;

import com.sc.dp.observer.Observer;

public interface Observable {

    void addObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers();
}
