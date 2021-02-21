package com.sc.cdb.services.hadith;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import com.sc.cdb.data.model.cc.Hadith;
import com.sc.cdb.data.repository.HadithRepository;
import com.sc.reminder.api.service.random.RandomAyaNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
        long totalHadith = hadithRepository.count();
        if (totalHadith < 1) {
            return Optional.empty();
        }

        Optional<Hadith> hadithOptional = Optional.empty();
        int hadithNumber = getTodayHadithNumber(totalHadith);

        Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "_id"));
        Pageable pageRequest = PageRequest.of(hadithNumber, 1, sort);
        Page<Hadith> hadithPage = hadithRepository.findAll(pageRequest);
        List<Hadith> content = hadithPage.getContent();
        if (content != null && !content.isEmpty()) {
            hadithOptional = Optional.of(hadithPage.getContent().get(0));
        }

        return hadithOptional;

    }

    private int getTodayHadithNumber(long totalHadith) {
        RandomAyaNumber randomAyaNumber = new RandomAyaNumber();
        int daysSinceEpoch = randomAyaNumber.daysSinceEpoch();
        return new Random(daysSinceEpoch).nextInt((int) totalHadith);
    }
}
