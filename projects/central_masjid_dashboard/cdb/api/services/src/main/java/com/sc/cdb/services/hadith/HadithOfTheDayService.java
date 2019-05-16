package com.sc.cdb.services.hadith;

import java.util.Optional;

import com.sc.cdb.data.model.cc.Hadith;

public interface HadithOfTheDayService {

  Optional<Hadith> todaysHadith();
}
