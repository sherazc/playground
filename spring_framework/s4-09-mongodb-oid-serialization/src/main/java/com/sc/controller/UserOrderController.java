package com.sc.controller;

import java.util.List;

import com.sc.dao.OrderUserDao;
import com.sc.modal.Order;
import com.sc.modal.OrderUser;
import com.sc.modal.User;
import com.sc.repository.OrderRepository;
import com.sc.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user-order")
public class UserOrderController {

    private UserRepository userRepository;
    private OrderRepository orderRepository;
    private OrderUserDao orderUserDao;

    public UserOrderController(
            UserRepository userRepository,
            OrderRepository orderRepository,
            OrderUserDao orderUserDao) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.orderUserDao = orderUserDao;
    }

    @PutMapping("/user")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/order")
    public ResponseEntity<Order> addOrder(@RequestBody Order order) {
        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/order")
    public ResponseEntity<List<OrderUser>> findAllOrders() {
        List<OrderUser> orders = orderUserDao.findAllOrders();
        return ResponseEntity.ok(orders);
    }
}
