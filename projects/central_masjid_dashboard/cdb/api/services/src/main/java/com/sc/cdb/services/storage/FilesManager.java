package com.sc.cdb.services.storage;

public interface FilesManager {
    boolean exists(String storage, String directory, String fileName);
    long size(String storage, String directory, String fileName);
    boolean delete(String storage, String directory, String fileName);
    byte[] read(String storage, String directory, String fileName);
    boolean write(String storage, String directory, String fileName, byte[] data);
}
