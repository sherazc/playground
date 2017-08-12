package com.sc.springboot.domain;

import javax.persistence.*;
import java.util.List;

@Entity
public class CustomerOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "customer_order_items",
            joinColumns = {
                @JoinColumn(
                        name = "customer_order_id", referencedColumnName = "id",
                        foreignKey = @ForeignKey(name = "fk_customer_order_items_customer_order")

                )
            },
            inverseJoinColumns = {
                @JoinColumn(
                        name = "items_id", referencedColumnName = "id",
                        foreignKey = @ForeignKey(name = "fk_customer_order_items_item")
                )
            }
    )
    private List<Item> items;

    @OneToOne
    @JoinColumn(name = "customer_id", foreignKey = @ForeignKey(name = "fk_customer_order_customer"))
    private Customer customer;

    public CustomerOrder() {
    }

    public CustomerOrder(Integer id, List<Item> items, Customer customer) {
        this.id = id;
        this.items = items;
        this.customer = customer;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @Override
    public String toString() {
        return "CustomerOrder{" +
                "id=" + id +
                ", items=" + items +
                ", customer=" + customer +
                '}';
    }
}
