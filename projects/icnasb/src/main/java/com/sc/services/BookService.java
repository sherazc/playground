package com.sc.services;

import com.sc.dao.BookDao;
import com.sc.domain.Book;
import com.sc.io.FileService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.inject.Named;

@Component("bookService")
public class BookService {

    private static final Logger LOG = LoggerFactory.getLogger(BookService.class);

    @Inject
    @Named("bookDao")
    private BookDao bookDao;

    @Inject
    @Named("mongoTemplate")
    private MongoTemplate mongoTemplate;

    @Inject
    @Named("fileService")
    private FileService fileService;

    @Inject
    @Named("documentLoader")
    private DocumentLoader documentLoader;

    public boolean deleteFromDbAndResourceByBookId(String bookId) {
        LOG.debug("Deleting book and its resources. " + bookId);
        if (StringUtils.isBlank(bookId)) {
            LOG.error("Can not delete book. BookId is blank.");
            return false;
        }
        LOG.info("Trying to stop .");
        DocumentLoader.RUNNING_THREADS.remove(bookId);
        Book book = bookDao.findById(bookId);
        if (book == null || StringUtils.isBlank(book.getServerFileName())) {
            LOG.error("Can not delete book. Can not find book by bookId. " + bookId);
            return false;
        }

        if (StringUtils.isNotBlank(book.getWordCollectionName())) {
            LOG.info("Dropping Book word's collection from database. " + book.getWordCollectionName());
            mongoTemplate.dropCollection(book.getWordCollectionName());
        }

        if (bookDao.deleteById(bookId) < 1) {
            LOG.error("Unable to delete book. " + book.getId());
            return false;
        }

        return fileService.deleteFile(book.getServerFileName());
    }

    public boolean processDocument(String bookId) {
        Book book = bookDao.findById(bookId);
        book.setProcessStatus(Book.ProcessStatus.PROCESSING);
        bookDao.update(book);
        documentLoader.loadDocumentInDatabase(book);
        return true;
    }
}
