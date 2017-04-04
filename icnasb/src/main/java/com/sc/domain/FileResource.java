package com.sc.domain;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;

import java.util.Date;

public class FileResource {

    public static final String FILE_NAME_DELIMITER = "$$";
    private long timeStamp;
    private String userId;
    private String serverFileName;
    private String clientFileName;
    private Date timeStampDate;

    public FileResource(String serverFileName) {
        this.serverFileName = serverFileName;
        if (StringUtils.isNotBlank(serverFileName)) {

            String[] fileNameParts = StringUtils.split(serverFileName, FILE_NAME_DELIMITER);
            if (fileNameParts.length > 0) {
                timeStamp = NumberUtils.toLong(fileNameParts[0]);
                timeStampDate = new Date(timeStamp);
            }
            if (fileNameParts.length > 1) {
                userId = fileNameParts[1];
            }
            if (fileNameParts.length > 2) {
                clientFileName = fileNameParts[2];
            }
        }
    }

    public long getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(long timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getServerFileName() {
        return serverFileName;
    }

    public void setServerFileName(String serverFileName) {
        this.serverFileName = serverFileName;
    }

    public String getClientFileName() {
        return clientFileName;
    }

    public void setClientFileName(String clientFileName) {
        this.clientFileName = clientFileName;
    }

    public Date getTimeStampDate() {
        return timeStampDate;
    }

    public void setTimeStampDate(Date timeStampDate) {
        this.timeStampDate = timeStampDate;
    }
}
