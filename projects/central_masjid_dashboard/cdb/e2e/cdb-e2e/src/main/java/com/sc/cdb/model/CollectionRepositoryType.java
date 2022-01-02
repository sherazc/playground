package com.sc.cdb.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.repository.MongoRepository;

@Data
@AllArgsConstructor
public class CollectionRepositoryType {
    private Class domainType;
    private MongoRepository repository;
}
