package com.sc.cdb.services.storage;

public interface FilesManager {
    boolean deleteFile(String directory, String fileName);
    byte[] readFile(String directory, String fileName);
    boolean writeFile(String directory, String fileName, byte[] data);
}
