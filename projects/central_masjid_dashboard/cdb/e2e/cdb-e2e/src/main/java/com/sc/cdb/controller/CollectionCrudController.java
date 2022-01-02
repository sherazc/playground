package com.sc.cdb.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sc.cdb.model.CollectionRepositoryType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/e2e/collection")
public class CollectionCrudController {

    private final Map<String, CollectionRepositoryType> collectionRepositories;

    public CollectionCrudController(Map<String, CollectionRepositoryType> collectionRepositories) {
        this.collectionRepositories = collectionRepositories;
    }

    @PostMapping("{collectionName}")
    public Object save(@PathVariable String collectionName, @RequestBody String objectJson) {
        CollectionRepositoryType collectionRepositoryType = collectionRepositories.get(collectionName);
        Object object = this.readObject(objectJson, collectionRepositoryType.getDomainType());
        return collectionRepositoryType.getRepository().save(object);
    }

    @GetMapping("{collectionName}")
    public List findAll(@PathVariable String collectionName) {
        CollectionRepositoryType collectionRepositoryType = collectionRepositories.get(collectionName);
        return collectionRepositoryType.getRepository().findAll();
    }

    @GetMapping("{collectionName}/id/{id}")
    public Object findById(@PathVariable String collectionName, @PathVariable String id) {
        CollectionRepositoryType collectionRepositoryType = collectionRepositories.get(collectionName);
        return collectionRepositoryType.getRepository().findById(id);
    }

    @DeleteMapping("{collectionName}/id/{id}")
    public void deleteById(@PathVariable String collectionName, @PathVariable String id) {
        CollectionRepositoryType collectionRepositoryType = collectionRepositories.get(collectionName);
        collectionRepositoryType.getRepository().deleteById(id);
    }

    private <T> T readObject(String objectJson, Class<T> type) {
        T result = null;
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            result = objectMapper.readValue(objectJson, type);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return result;
    }
}
