package com.sc.android.utils;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonParserUtil {
	private static final ObjectMapper objectMapper = new ObjectMapper();

	public static <T> T jsonToObject(String json, Class<T> objectKlass) {
		T result = null;
		try {
			result = objectMapper.readValue(json, objectKlass);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}

	public static String objectToJson(Object object) {
		if (object == null) {
			return null;
		}
		String result = null;
		try {
			result = objectMapper.writeValueAsString(object);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return result;
	}
}
