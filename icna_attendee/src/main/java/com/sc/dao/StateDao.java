package com.sc.dao;

import java.util.List;

import com.sc.domain.State;

public interface StateDao {
	State getByAbbreviation(String abbreviation);

	String getDisplayNameByAbbreviation(String abbreviation);
	
	List<State> getAllStates();
}
