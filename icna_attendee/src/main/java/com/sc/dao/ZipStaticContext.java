package com.sc.dao;

import java.io.BufferedReader;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Component;

import com.sc.domain.Zip;
import com.sc.exception.SystemConfigureException;
import com.sc.utils.ClasspathFileReaderUtil;

@Component("zipStaticContext")
public class ZipStaticContext implements ZipDao, StaticContext, Serializable {

	private static final long serialVersionUID = 1L;

	private List<Zip> context;

	@Inject
	@Named("stateStaticContext")
	private StateDao stateDao;

	public void loadContext() {
		String fileName = "zipNEW.csv";
		if (context != null && context.size() > 0) {
			return;
		}
		context = new ArrayList<Zip>();
		BufferedReader reader = ClasspathFileReaderUtil.reader(fileName);
		try {
			String line = null;

			while ((line = reader.readLine()) != null) {
				String[] tokens = line.split(",");
				if (tokens.length < 6) {
					continue;
				}
				Zip zip = new Zip();
				zip.setZipCode(tokens[0]);
				zip.setLongitude(tokens[1]);
				zip.setLatitude(tokens[2]);
				zip.setCity(tokens[3]);
				zip.setCounty(tokens[4]);
				String stateAbr = tokens[5];
				zip.setState(stateDao.getByAbbreviation(stateAbr));
				context.add(zip);
			}
		} catch (Exception e) {
			throw new SystemConfigureException("Error loading file. " + fileName, e);
		}
	}

	public Zip getByZipCode(String zipCode) {
		if (StringUtils.isBlank(zipCode)) {
			return null;
		}
		loadContext();
		Zip zipResult = null;
		for (Zip zip : context) {
			if (StringUtils.equals(zipCode, zip.getZipCode())) {
				zipResult = zip;
				break;
			}
		}
		return zipResult;
	}

	public StateDao getStateDao() {
		return stateDao;
	}

	public void setStateDao(StateDao stateDao) {
		this.stateDao = stateDao;
	}

}
