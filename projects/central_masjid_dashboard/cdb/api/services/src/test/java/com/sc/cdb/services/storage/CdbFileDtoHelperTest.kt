package com.sc.cdb.services.storage

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

class CdbFileDtoHelperTest {

    private lateinit var underTest: CdbFileDtoHelper

    @BeforeEach
    fun setUp() {
        underTest = CdbFileDtoHelper()
    }


    @Test
    fun slashPrefixSuffix() {
        assertEquals("/", underTest.getDirectory(null))
        assertEquals("/", underTest.getDirectory(""))
        assertEquals("/a/", underTest.getDirectory("a"))
        assertEquals("/a/", underTest.getDirectory("/a"))
        assertEquals("/a/", underTest.getDirectory("a/"))
        assertEquals("/a/", underTest.getDirectory("/a/"))
    }
}