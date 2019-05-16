package com.sc.cdb.services.hadith;

import java.util.Optional;
import java.util.Random;

import com.sc.cdb.data.model.cc.Hadith;
import com.sc.cdb.data.repository.HadithRepository;
import com.sc.reminder.api.service.random.RandomAyaNumber;
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
  public Optional<Hadith> todaysHadith() {
    int hadithNumber = getTodayHadithNumber();
    return hadithRepository.findById("" + hadithNumber);
  }

  private int getTodayHadithNumber() {
    RandomAyaNumber randomAyaNumber = new RandomAyaNumber();
    long totalHadith = hadithRepository.count();
    int daysSinceEpoch = randomAyaNumber.daysSinceEpoch();
    return new Random(daysSinceEpoch).nextInt((int) totalHadith);
  }
}
