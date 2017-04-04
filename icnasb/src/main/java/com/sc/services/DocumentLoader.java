package com.sc.services;

import com.sc.dao.BookDao;
import com.sc.dao.WordDao;
import com.sc.domain.Book;
import com.sc.domain.Word;
import com.sc.domain.WordReference;
import com.sc.io.FileService;
import com.sc.util.WebUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.util.PDFTextStripper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.inject.Named;
import java.io.File;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component("documentLoader")
public class DocumentLoader implements Runnable {

    public static final Map<String, Boolean> RUNNING_THREADS = new HashMap<String, Boolean>();
    private static final Logger LOG = LoggerFactory.getLogger(DocumentLoader.class);

    private static final Pattern WORD_PATTERN = Pattern.compile("[\\w'-]+");

    private static final Pattern NOT_NUMBER_PATTERN = Pattern.compile("[^0-9]+");

    private static final int WORD_LENGTH_MINIMUM = 3;
    private static final int WORD_LENGTH_MAXIMUM = 50;

    private Book book;

    @Inject
    @Named("fileService")
    private FileService fileService;

    @Inject
    @Named("mongoTemplate")
    private MongoTemplate mongoTemplate;

    @Inject
    @Named("bookDao")
    private BookDao bookDao;

    @Inject
    @Named("wordDao")
    private WordDao wordDao;



    public void run() {
        if (book == null || !book.valid()) {
            LOG.error("Can not process book. Invalid book.");

            return;
        }
        RUNNING_THREADS.put(book.getId(), true);
        File serverFile = fileService.serverFileNameToFileObject(book.getServerFileName());

        if (serverFile == null || !serverFile.exists() || !serverFile.canRead()) {
            LOG.error("Data file do not exists on server or it cant be read.");
        }

        try {
            PDDocument pdDocument = PDDocument.load(serverFile);

            int totalPages = pdDocument.getNumberOfPages();
            book.setTotalPages(totalPages);
            long linePointer = 0;

            boolean threadInterrupted = false;
            for (int currentPage = 1; currentPage <= totalPages; currentPage++) {
                Boolean keepRunning = RUNNING_THREADS.get(book.getId());
                if (keepRunning == null || !keepRunning) {
                    LOG.warn("Interrupting book processing. bookId=" + book.getId());
                    threadInterrupted = true;
                    break;
                }
                // Resetting linePointer on each page
                linePointer = 1;
                StringWriter outputWriter = new StringWriter();
                PDFTextStripper stripper = new PDFTextStripper();
                stripper.setStartPage(currentPage);
                stripper.setEndPage(currentPage);
                stripper.writeText(pdDocument, outputWriter);
                String pageString = outputWriter.toString();

                linePointer = writePageWordsToDb(currentPage, pageString, linePointer);
                if (currentPage % 10 == 0) {
                    book.setProcessingPage(currentPage);
                    bookDao.update(book);
                }
            }

            if (pdDocument != null) {
                pdDocument.close();
            }

            book.setProcessingPage(null);
            if (threadInterrupted) {
                LOG.warn("Failed to process Book. bookId=" + book.getId());
                book.setProcessStatus(Book.ProcessStatus.FAILED_PROCESSING);
            }else {
                LOG.debug("Book Successfully processed. bookId=" + book.getId());
                book.setProcessStatus(Book.ProcessStatus.SUCCESSFULLY_PROCESSED);
            }

            bookDao.update(book);
        } catch (Exception e) {
            LOG.error("Error while loading document in database.", e);
            book.setProcessStatus(Book.ProcessStatus.FAILED_PROCESSING);
            bookDao.update(book);
        }

    }


    private long writePageWordsToDb(int pageNumber, String pageString, long linePointer) {
        Scanner scanner = new Scanner(pageString);
        while (scanner.hasNextLine()) {

            String lineText = scanner.nextLine();
            Matcher lineWordMatcher = WORD_PATTERN.matcher(lineText);
            while (lineWordMatcher.find()) {
                String word = lineText.substring(lineWordMatcher.start(), lineWordMatcher.end());
                insertWordInDocumentDatabase(word, lineText, pageNumber, linePointer);
            }
            linePointer++;
        }
        scanner.close();
        return linePointer;
    }

    private void insertWordInDocumentDatabase(String wordInput, String lineText, int pageNumber,
                                              long lineNumber) {
        String word = WebUtils.cleanupWordSpecialCharacters(wordInput);
        if (StringUtils.isBlank(word)) {
            return;
        }
        String wordCaps = word.toUpperCase();
        if (StringUtils.isBlank(word) || !wordInsertable(wordCaps)) {
            return;
        }

        Word wordObject = wordDao.findWordInBookCollection(book.getWordCollectionName(), wordCaps);

        if (wordObject == null) {
            wordObject = new Word(book.getId(), word.toUpperCase(), pageNumber, lineNumber, lineText);
        } else {
            wordObject.getWordReferences().add(new WordReference(pageNumber, lineNumber, lineText));
        }

        if (LOG.isTraceEnabled()) {
            LOG.trace("Inserting word (" + wordObject + ") in collection " + book.getWordCollectionName());
        }

        wordDao.update(wordObject, book.getWordCollectionName());
    }


    private boolean wordInsertable(String word) {
        boolean result = StringUtils.isNotBlank(word);
		result = result && word.length() >= WORD_LENGTH_MINIMUM;
		result = result && word.length() <= WORD_LENGTH_MAXIMUM;
        Matcher notWordMatcher = NOT_NUMBER_PATTERN.matcher(word);
        result = result && notWordMatcher.matches();
        return result;
    }

    public void loadDocumentInDatabase(Book book) {
        if (book == null) {
            return;
        }
        if (!book.valid()) {
            book.setProcessStatus(Book.ProcessStatus.FAILED_PROCESSING);
            bookDao.update(book);
        }
        this.book = book;
        Thread thread = new Thread(this);
        thread.start();
    }
}
