package com.lal;

import com.lal.modal.Item;
import com.lal.services.StoreInventory;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

public class App {
    public static void main(String[] args) {
        BeanFactory beanFactory = new ClassPathXmlApplicationContext("context.xml");
        StoreInventory storeInventory = (StoreInventory) beanFactory.getBean("storeInventory");
        List<Item> items = storeInventory.findAllInventory();
        items.forEach(item -> System.out.println(item.getName()));
    }
}
