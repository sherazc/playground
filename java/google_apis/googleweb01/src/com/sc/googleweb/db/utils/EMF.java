package com.sc.googleweb.db.utils;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class EMF {

	private static final EntityManagerFactory emfInstance = Persistence
			.createEntityManagerFactory("transactions-optional");

	private EMF() {
	}

	public static EntityManagerFactory get() {
		return emfInstance;
	}
}
