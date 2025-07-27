package com.sc.redis.controller;

import com.sc.redis.dto.ItemTwo;
import com.sc.redis.service.ItemTwoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/item-two")
@RequiredArgsConstructor
public class ItemTwoController {

  private final ItemTwoService itemTwoService;

  @GetMapping("/{id}")
  public ItemTwo getItemTwoById(@PathVariable Long id) {
    return itemTwoService.getItemTwoById(id);
  }
}