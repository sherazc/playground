package com.sc.dao;

import java.io.BufferedReader;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Component;

import com.sc.domain.State;
import com.sc.utils.ClasspathFileReaderUtil;

@Component("stateStaticContext")
public class StateStaticContext implements StateDao, StaticContext, Serializable {

	private static final long serialVersionUID = 1L;

	private List<State> context;

	public void loadContext() {
		if (context != null && context.size() > 0) {
			return;
		}
		context = new ArrayList<State>();
		BufferedReader reader = ClasspathFileReaderUtil.reader("state.csv");
		try {
			String line = null;
			while ((line = reader.readLine()) != null) {
				StringTokenizer stringTokenizer = new StringTokenizer(line, ",");
				State state = new State();
				state.setState(stringTokenizer.nextToken());
				state.setStateAbr(stringTokenizer.nextToken());
				context.add(state);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public State getByAbbreviation(String abbreviation) {
		if (StringUtils.isBlank(abbreviation)) {
			return null;
		}
		State stateResult = null;
		loadContext();
		for (State state : context) {
			if (StringUtils.equalsIgnoreCase(abbreviation, state.getStateAbr())) {
				stateResult = state;
				break;
			}
		}
		return stateResult;
	}

	public String getDisplayNameByAbbreviation(String abbreviation) {
		String displayName = null;
		if (StringUtils.isBlank(abbreviation)) {
			return "";
		}
		State state = this.getByAbbreviation(abbreviation);
		if (state != null && StringUtils.isNotBlank(state.getState())) {
			displayName = state.getState();
		} else {
			displayName = abbreviation;
		}
		return displayName;
	}

	public List<State> getAllStates() {
		loadContext();
		return this.context;
	}
}
