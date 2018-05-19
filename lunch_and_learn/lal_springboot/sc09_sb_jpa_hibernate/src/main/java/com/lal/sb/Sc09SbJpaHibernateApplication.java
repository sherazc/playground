package com.lal.sb;

import com.lal.sb.modal.Item;
import com.lal.sb.services.StoreInventory;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class Sc09SbJpaHibernateApplication {

	public static void main(String[] args) {
		BeanFactory beanFactory = SpringApplication.run(Sc09SbJpaHibernateApplication.class, args);
		StoreInventory storeInventory = beanFactory.getBean(StoreInventory.class);

		List<Item> items = storeInventory.findAllInventory();
		items.forEach(item -> System.out.format("%d, %s, %.2f\n", item.getId(), item.getName(), item.getPrice()));

	}
}
