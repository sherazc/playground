package com.sc.cdb.model;

import com.sc.cdb.data.model.auth.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Map;


@Component
public class RepositoryType {
    @Autowired
    private Map<String, MongoRepository> repositories;

    @Autowired
    private List<MongoRepository> repositories2;

    @PostConstruct
    public void listImplementations() {
        System.out.println(repositories);
    }


//    private Class<T> domainType;
//    private MongoRepository<T, String> repository;
//
//    class Type<T> {
//        private Class<T> domainType;
//        private MongoRepository<T, String> repository;
//    }
}
