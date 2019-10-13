package com.sc.controller;

import java.util.List;
import java.util.Optional;

import com.sc.dao.OrderUserDao;
import com.sc.modal.Order;
import com.sc.modal.OrderUser;
import com.sc.modal.User;
import com.sc.repository.OrderRepository;
import com.sc.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/user/id/{userId}")
    public ResponseEntity<User> addUser(@PathVariable String userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        User user = userOptional.orElse(null);
        return ResponseEntity.ok(user);
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

    @GetMapping("/order/user/id/{userId}")
    public ResponseEntity<List<Order>> findOrderByUserId(@PathVariable String userId) {
        List<Order> orders = orderRepository.findByUserId(new ObjectId(userId));
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/orderUser/user/id/{userId}")
    public ResponseEntity<List<OrderUser>> findOrderUserByUserId(@PathVariable String userId) {
        List<OrderUser> orders = orderUserDao.findOrderUserByUserId(userId);
        return ResponseEntity.ok(orders);
    }
}
