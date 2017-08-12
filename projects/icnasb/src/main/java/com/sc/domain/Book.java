package com.sc.domain;

import com.sc.services.DocumentLoader;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "book", language = "")
public class Book extends BaseEntity {

    public boolean valid() {
        return StringUtils.isNoneBlank(documentName)
                && StringUtils.isNoneBlank(serverFileName)
                && StringUtils.isNoneBlank(userId)
                && StringUtils.isNoneBlank(clientFileName)
                && uploadedDate != null
                && processStatus != null;
    }

    public enum ProcessStatus {
        NOT_PROCESSED,
        PROCESSING,
        SUCCESSFULLY_PROCESSED,
        FAILED_PROCESSING
    }

    private String documentName;
    private String documentDescription;
    private ProcessStatus processStatus;
    private Date uploadedDate;
    private Date processedDate;
    private String serverFileName;
    private String userId;
    private String clientFileName;
    private String wordCollectionName;
    private Integer totalPages;
    private Integer processingPage;

    public String getDocumentName() {
        return documentName;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public String getDocumentDescription() {
        return documentDescription;
    }

    public void setDocumentDescription(String documentDescription) {
        this.documentDescription = documentDescription;
    }

    public Date getUploadedDate() {
        return uploadedDate;
    }

    public void setUploadedDate(Date uploadedDate) {
        this.uploadedDate = uploadedDate;
    }

    public Date getProcessedDate() {
        return processedDate;
    }

    public void setProcessedDate(Date processedDate) {
        this.processedDate = processedDate;
    }

    public ProcessStatus getProcessStatus() {
        return processStatus;
    }

    public void setProcessStatus(ProcessStatus processStatus) {
        this.processStatus = processStatus;
    }

    public String getServerFileName() {
        return serverFileName;
    }

    public void setServerFileName(String serverFileName) {
        this.serverFileName = serverFileName;
        FileResource fileResource = serverFileNameToFileResource();
        this.setUploadedDate(fileResource.getTimeStampDate());
        this.setUserId(fileResource.getUserId());
        this.setClientFileName(fileResource.getClientFileName());
    }

    public FileResource serverFileNameToFileResource() {
        return new FileResource(this.getServerFileName());
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getClientFileName() {
        return clientFileName;
    }

    public void setClientFileName(String clientFileName) {
        this.clientFileName = clientFileName;
    }

    public String getWordCollectionName() {
        return wordCollectionName;
    }

    public void setWordCollectionName(String wordCollectionName) {
        this.wordCollectionName = wordCollectionName;
    }

    public Integer getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
    }

    public Integer getProcessingPage() {
        return processingPage;
    }

    public void setProcessingPage(Integer processingPage) {
        this.processingPage = processingPage;
    }

    public Integer getPercentageComplete() {
        if (ProcessStatus.SUCCESSFULLY_PROCESSED.equals(this.getProcessStatus())) {
            return 100;
        }
        if (totalPages == null || totalPages < 1 || processingPage == null || processingPage < 1) {
            return 0;
        }
        int percentageComplete = 0;
        try {
            percentageComplete = (int) (((double)processingPage / totalPages) * 100);
        } catch (Exception e) {

        }
        return percentageComplete;
    }

    public boolean getBookProcessThreadRunning() {
        if (getId() == null) {
            return false;
        }
        Boolean processThreadRunning = DocumentLoader.RUNNING_THREADS.get(getId());
        if (processThreadRunning == null) {
            return false;
        } else {
            return processThreadRunning;
        }
    }
    
    public String getDisplayStatus() {
        String displayStatus = this.getProcessStatus().toString();
        int percentageComplete = getPercentageComplete();
        if (percentageComplete > 0) {
            displayStatus = percentageComplete + "%";
        }
        return displayStatus;
    }
}
