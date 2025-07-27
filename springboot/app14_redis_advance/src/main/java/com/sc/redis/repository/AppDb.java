package com.sc.redis.repository;

import com.sc.redis.dto.ItemOne;
import com.sc.redis.dto.ItemTwo;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Repository
public class AppDb {
  public static final Map<Long, ItemOne> itemOnes = Map.of(
      100L, new ItemOne(100L, "item-one-a"),
      200L, new ItemOne(200L, "item-one-b"),
      300L, new ItemOne(300L, "item-one-c"));

  public static final Map<Long, ItemTwo> itemTwos = Map.of(
      1L, new ItemTwo(1L, "item-two-a"),
      2L, new ItemTwo(2L, "item-two-b"),
      3L, new ItemTwo(3L, "item-two-c"));
}
