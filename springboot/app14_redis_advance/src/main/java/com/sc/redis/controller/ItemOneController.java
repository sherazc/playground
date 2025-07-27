package com.sc.redis.controller;

import com.sc.redis.dto.ItemOne;
import com.sc.redis.service.ItemOneService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/item-one")
@RequiredArgsConstructor
public class ItemOneController {

  private final ItemOneService itemOneService;

  @GetMapping("/{id}")
  public ItemOne getItemOne(@PathVariable Long id) {
    return itemOneService.getItemOneById(id);
  }
}