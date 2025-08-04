package com.sc.redis.controller;

import com.sc.redis.dto.ItemThree;
import com.sc.redis.service.ItemThreeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/item-three")
@RequiredArgsConstructor
public class ItemThreeController {

  private final ItemThreeService itemThreeService;

  @GetMapping("/{id}")
  public ItemThree getItemTwoById(@PathVariable Long id) {
    return itemThreeService.getItemThreeById(id);
  }
}