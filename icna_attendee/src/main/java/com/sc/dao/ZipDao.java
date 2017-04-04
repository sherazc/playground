package com.sc.dao;

import com.sc.domain.Zip;

public interface ZipDao {

	Zip getByZipCode(String zipCode);
}
