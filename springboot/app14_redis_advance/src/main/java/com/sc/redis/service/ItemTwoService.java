package com.sc.redis.service;

import com.sc.redis.repository.AppDb;
import com.sc.redis.dto.ItemTwo;
import com.sc.redis.util.CommonUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemTwoService {

  private final AppDb appDb;

  @Cacheable(value="item-two")
  public ItemTwo getItemTwoById(Long id) {
    System.out.println("Fetching item two from DB...");
    CommonUtils.simulateDelay(2000);
    return appDb.itemTwos.get(id);
  }
}
