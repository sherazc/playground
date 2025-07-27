package com.sc.redis.service;

import com.sc.redis.dto.ItemOne;
import com.sc.redis.repository.AppDb;
import com.sc.redis.util.CommonUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemOneService {

  private final AppDb appDb;

  @Cacheable(value="item-one")
  public ItemOne getItemOneById(Long id) {
    System.out.println("Fetching item-one from DB...");
    CommonUtils.simulateDelay(2000);
    return appDb.itemOnes.get(id);
  }

}
