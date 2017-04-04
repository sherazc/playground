package com.sc.dao;

import com.sc.domain.Word;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component("wordDao")
public class WordDao extends BaseDao<Word> {

    @Inject
    @Named("mongoTemplate")
    private MongoTemplate mongoTemplate;

    public Set<Word> findSamples(String wordCollectionName, int numberOfSamples) {
        if (StringUtils.isBlank(wordCollectionName)) {
            return null;
        }

        long totalRecords = mongoTemplate.count(null, wordCollectionName);
        if (totalRecords < 1) {
            return null;
        }

        Set<Word> wordSamples = new HashSet<Word>();

        for (int i = 0; i < numberOfSamples; i++) {
            long recordNumber = (long) (Math.random() * totalRecords);
            Word word = getWordRecord(wordCollectionName, recordNumber);
            if (word != null) {
                wordSamples.add(word);
            }
        }

        return wordSamples;
    }

    private Word getWordRecord(String wordCollectionName, long recordNumber) {
        Query query = Query.query(Criteria.where("_id").exists(true)).skip((int) recordNumber).limit(1);
        List<Word> words = mongoTemplate.find(query, Word.class, wordCollectionName);
        Word resultWord = null;
        if (words != null && words.size() > 0) {
            resultWord = words.get(0);
        }

        return resultWord;
    }

    public Word findWordInBookCollection(String wordCollectionName, String word) {
        if (StringUtils.isBlank(wordCollectionName) || StringUtils.isBlank(word)) {
            return null;
        }

        String wordCaps = word.toUpperCase();
        Word wordResult = null;

        List<Word> words = this.find(Criteria.where("word").is(wordCaps), wordCollectionName);
        if (words != null && words.size() > 0) {
            wordResult = words.get(0);
        }

        return wordResult;
    }

    @Override
    protected Class<Word> getEntityClass() {
        return Word.class;
    }
}
