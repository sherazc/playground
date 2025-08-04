package com.sc.redis.repository;

import com.sc.redis.dto.ItemOne;
import com.sc.redis.dto.ItemThree;
import com.sc.redis.dto.ItemTwo;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class AppDb {
  public static final Map<Long, ItemOne> itemOnes = Map.of(
      1L, new ItemOne(1L, "item-one-a"),
      2L, new ItemOne(2L, "item-one-b"),
      3L, new ItemOne(3L, "item-one-c"));

  public static final Map<Long, ItemTwo> itemTwos = Map.of(
      10L, new ItemTwo(10L, "item-two-a"),
      20L, new ItemTwo(20L, "item-two-b"),
      30L, new ItemTwo(30L, "item-two-c"));

  public static final Map<Long, ItemThree> itemThrees = Map.of(
      100L, new ItemThree(100L, "item-Three-a"),
      200L, new ItemThree(200L, "item-Three-b"),
      300L, new ItemThree(300L, "item-Three-c"));
}
