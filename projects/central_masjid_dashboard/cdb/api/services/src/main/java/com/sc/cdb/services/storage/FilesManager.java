package com.sc.cdb.services.storage;

public interface FilesManager {
    boolean exists(String directory, String fileName);
    long size(String directory, String fileName);
    boolean delete(String directory, String fileName);
    byte[] read(String directory, String fileName);
    boolean write(String directory, String fileName, byte[] data);
}
