package com.sc.cdb.controller;

import com.sc.cdb.data.repository.HadithRepository;
import com.sc.cdb.model.RepositoryType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/e2e/collection")
public class CollectionCrudController {

    private final RepositoryType repositoryType;


    private final HadithRepository hadithRepository;

    public CollectionCrudController(RepositoryType repositoryType, HadithRepository hadithRepository) {
        this.repositoryType = repositoryType;
        this.hadithRepository = hadithRepository;
    }

    @PostMapping("{collectionName}")
    public boolean saveObject(@PathVariable String collectionName, @RequestBody String objectString) {
        return true;
    }
}
