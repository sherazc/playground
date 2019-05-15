package com.sc.cdb.services.hadith;

import java.util.Random;

import com.sc.cdb.data.model.cc.Hadith;
import com.sc.cdb.data.repository.HadithRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HadithOfTheDayServiceImpl implements HadithOfTheDayService {

  private HadithRepository hadithRepository;

  @Autowired
  public HadithOfTheDayServiceImpl(HadithRepository hadithRepository) {
    this.hadithRepository = hadithRepository;
  }

  @Override
  public Hadith todaysHadith() {

    long totalHadith = hadithRepository.count();

    // new Random(seed).nextInt(totalHadith);
    return new Hadith("123", "Hadith Text", "Hadith Reference");
  }
}
