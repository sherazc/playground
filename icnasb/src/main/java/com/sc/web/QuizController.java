package com.sc.web;

import com.sc.dao.BookDao;
import com.sc.dao.WordDao;
import com.sc.domain.Book;
import com.sc.domain.Word;
import com.sc.domain.dictionary.DictionaryEntry;
import com.sc.util.DictionaryUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/quiz")
public class QuizController {

    public static final int NUMBER_OF_SAMPLES = 5;
    public static final int MAX_NUMBER_OF_SAMPLES = 100;

    @Inject
    @Named("bookDao")
    private BookDao bookDao;

    @Inject
    @Named("wordDao")
    private WordDao wordDao;

    @RequestMapping({"/{bookid}"})
    public ModelAndView showQuiz(@PathVariable("bookid") String bookId) {
        ModelAndView modelAndView = new ModelAndView("show-quiz");
        setupQuiz(bookId, modelAndView, NUMBER_OF_SAMPLES);
        modelAndView.addObject("defaultNumberOfSamples", NUMBER_OF_SAMPLES);
        return modelAndView;
    }

    @RequestMapping({"/refresh/{bookid}/{generateQuizCount}"})
    public ModelAndView refreshQuiz(@PathVariable("bookid") String bookId,
                                    @PathVariable("generateQuizCount") String generateQuizCountString) {
        int generateQuizCount = generateQuizCountParameterToInt(generateQuizCountString);
        ModelAndView modelAndView = new ModelAndView("components/quiz-table");
        setupQuiz(bookId, modelAndView, generateQuizCount);
        return modelAndView;
    }

    private void setupQuiz(String bookId, ModelAndView modelAndView, int numberOfSamples) {
        if (StringUtils.isNotBlank(bookId)) {
            Book book = bookDao.findById(bookId);
            modelAndView.addObject("book", book);

            if (book != null && StringUtils.isNotBlank(book.getWordCollectionName())) {
                Set<Word> wordSamples = wordDao.findSamples(book.getWordCollectionName(), numberOfSamples);
                modelAndView.addObject("wordSamples", wordSamples);
            }
        }
    }

    private int generateQuizCountParameterToInt(String generateQuizCountString) {
        int generateQuizCount = NumberUtils.toInt(StringUtils.trim(generateQuizCountString));
        if (generateQuizCount > MAX_NUMBER_OF_SAMPLES || generateQuizCount < 1) {
            generateQuizCount = NUMBER_OF_SAMPLES;
        }
        return generateQuizCount;
    }

    @RequestMapping({"/define/{word}"})
    public
    @ResponseBody
    List<DictionaryEntry> defineWord(@PathVariable("word") String word) {
        List<DictionaryEntry> wordDefinitions = null;
        try {
            wordDefinitions = DictionaryUtils.findWordDefinitions(word);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return wordDefinitions;
    }
}