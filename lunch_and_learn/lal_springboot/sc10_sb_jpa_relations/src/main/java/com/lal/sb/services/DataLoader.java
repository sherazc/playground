package com.lal.sb.services;

import java.util.Arrays;

import com.lal.sb.model.Customer;
import com.lal.sb.model.CustomerOrder;
import com.lal.sb.model.Product;
import com.lal.sb.model.Store;
import com.lal.sb.repository.CustomerOrderRepository;
import com.lal.sb.repository.CustomerRepository;
import com.lal.sb.repository.ProductRepository;
import com.lal.sb.repository.StoreRepository;
import org.springframework.stereotype.Component;

@Component
public class DataLoader {
    private StoreRepository storeRepository;
    private ProductRepository productRepository;
    private CustomerRepository customerRepository;
    private CustomerOrderRepository customerOrderRepository;

    public DataLoader(
            StoreRepository storeRepository,
            ProductRepository productRepository,
            CustomerRepository customerRepository,
            CustomerOrderRepository customerOrderRepository) {
        this.storeRepository = storeRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.customerOrderRepository = customerOrderRepository;
    }

    public void loadDefaultData() {
        Store store1 = new Store(null, "Walmart");
        Store store2 = new Store(null, "Costco");
        storeRepository.saveAll(Arrays.asList(store1, store2));

        Product product1 = new Product(null, "TV", 599.99, store1);
        Product product2 = new Product(null, "Milk", 2.59, store1);
        Product product3 = new Product(null, "Apple", 5.50, store1);

        Product product4 = new Product(null, "Tire", 80d, store2);
        Product product5 = new Product(null, "Gas", 2.49, store2);

        productRepository.saveAll(Arrays.asList(
                product1,
                product2,
                product3,
                product4,
                product5));

        Customer customer1 = new Customer(null, "Sheraz");
        Customer customer2 = new Customer(null, "Chaudhry");

        customerRepository.saveAll(Arrays.asList(customer1, customer2));

        CustomerOrder customerOrder1 = new CustomerOrder(null, customer1, Arrays.asList(product1, product1));
        CustomerOrder customerOrder2 = new CustomerOrder(null, customer2, Arrays.asList(product4));
        CustomerOrder customerOrder3 = new CustomerOrder(null, customer2, Arrays.asList(product3, product5));
        customerOrderRepository.saveAll(Arrays.asList(customerOrder1, customerOrder2, customerOrder3));
    }
}
