package com.sc.common.utils;

import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class FileReaderTest {

    private FileReader fileReader;

    @Before
    public void setUp() throws Exception {
        fileReader = new FileReader();
    }

    @Test
    public void testReadAllLinesInvalidFile() {
        assertNull(fileReader.realAllLines("bad_file_name.txt"));
        assertNull(fileReader.realAllLines(null));
    }

    @Test
    public void testReadAllLinesValidFile() {
        List<String> lines = fileReader.realAllLines("input_file.txt");
        assertNotNull(lines);
        assertEquals(3, lines.size());
    }
}