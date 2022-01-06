package com.sc.cdb.config;

import com.sc.cdb.data.model.auth.Company;
import com.sc.cdb.data.model.auth.User;
import com.sc.cdb.data.model.cc.CentralControl;
import com.sc.cdb.data.model.cc.Hadith;
import com.sc.cdb.data.model.picklist.Picklist;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.data.model.version.CompanyDataVersion;
import com.sc.cdb.data.model.version.CompanyListVersion;
import com.sc.cdb.data.repository.CentralControlRepository;
import com.sc.cdb.data.repository.CompanyDataVersionRepository;
import com.sc.cdb.data.repository.CompanyListVersionRepository;
import com.sc.cdb.data.repository.CompanyRepository;
import com.sc.cdb.data.repository.HadithRepository;
import com.sc.cdb.data.repository.PicklistRepository;
import com.sc.cdb.data.repository.PrayerConfigRepository;
import com.sc.cdb.data.repository.UserRepository;
import com.sc.cdb.model.CollectionRepositoryType;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CollectionRepositoryConfig {

    @Bean
    public Map<String, CollectionRepositoryType> loadRepositoryBeans(ApplicationContext context) {
        Map<String, CollectionRepositoryType> collectionTypes = new HashMap<>();

        CentralControlRepository centralControlRepository = context.getBean(CentralControlRepository.class);
        collectionTypes.put("centralControl", new CollectionRepositoryType(CentralControl.class, centralControlRepository));

        CompanyDataVersionRepository companyDataVersionRepository = context.getBean(CompanyDataVersionRepository.class);
        collectionTypes.put("companyDataVersion", new CollectionRepositoryType(CompanyDataVersion.class, companyDataVersionRepository));

        CompanyListVersionRepository companyListVersionRepository = context.getBean(CompanyListVersionRepository.class);
        collectionTypes.put("companyListVersion", new CollectionRepositoryType(CompanyListVersion.class, companyListVersionRepository));

        CompanyRepository companyRepository = context.getBean(CompanyRepository.class);
        collectionTypes.put("company", new CollectionRepositoryType(Company.class, companyRepository));

        HadithRepository hadithRepository = context.getBean(HadithRepository.class);
        collectionTypes.put("hadith", new CollectionRepositoryType(Hadith.class, hadithRepository));

        PicklistRepository picklistRepository = context.getBean(PicklistRepository.class);
        collectionTypes.put("picklist", new CollectionRepositoryType(Picklist.class, picklistRepository));

        PrayerConfigRepository prayerConfigRepository = context.getBean(PrayerConfigRepository.class);
        collectionTypes.put("prayerConfig", new CollectionRepositoryType(PrayerConfig.class, prayerConfigRepository));

        UserRepository userRepository = context.getBean(UserRepository.class);
        collectionTypes.put("user", new CollectionRepositoryType(User.class, userRepository));

        return collectionTypes;
    }
}
