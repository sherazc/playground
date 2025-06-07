package com.sc.batch.services;

import com.sc.batch.model.User;
import org.springframework.batch.item.ItemProcessor;

public class UserItemProcessor implements ItemProcessor<User, User> {
  @Override
  public User process(User user) {
    user.setEmail(user.getEmail().toLowerCase());
    return user;
  }
}
