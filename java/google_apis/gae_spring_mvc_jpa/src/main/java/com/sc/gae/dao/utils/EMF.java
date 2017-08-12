package com.sc.gae.dao.utils;

import java.util.logging.Logger;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public final class EMF {

	private static final Logger LOG = Logger.getLogger(EMF.class.getName());
	// https://code.google.com/p/click-jpa-demo/source/browse/
	private static final ThreadLocal<EntityManager> THREAD_LOCAL = new ThreadLocal<EntityManager>();

	private static EntityManagerFactory entityManagerFactory = Persistence
			.createEntityManagerFactory("transactions-optional");

	private EMF() {
	}

	public static EntityManagerFactory getEMF() {
		return entityManagerFactory;
	}

	public static EntityManager getEntityManager() {
		EntityManager em = THREAD_LOCAL.get();
		if (em == null || !em.isOpen()) {
			EMF.LOG.info("Opening a new EntityManager/Connection.");
			em = getEMF().createEntityManager();
			setEM(em);
			return em;
		} else {
			return em;
		}
	}

	public static void beginTransaction() {
		EntityManager em = EMF.getEntityManager();
		if (em != null && em.isOpen()) {
			if (em.getTransaction().isActive()) {
				EMF.LOG.fine("Transaction already active");
			} else {
				EMF.LOG.fine("Starting a new Transaction");
				em.getTransaction().begin();
			}
		} else {
			EMF.LOG.warning("Failed to create EntityManager or Failed to open connection.");
		}
	}

	public static void commitTransaction() {
		EntityManager em = EMF.getEntityManager();
		if (em != null && em.isOpen()) {
			if (em.getTransaction().isActive()) {
				EMF.LOG.fine("Commiting transaction");
				em.getTransaction().commit();
			} else {
				EMF.LOG.warning("Cant commit. No transaction active.");
			}
		} else {
			EMF.LOG.warning("Cant commit. No open connection found.");
		}
	}

	public static void rollbackTransaction() {
		EntityManager em = EMF.getEntityManager();
		if (em != null && em.isOpen()) {
			if (em.getTransaction().isActive()) {
				EMF.LOG.info("Rollback transaction");
				em.getTransaction().rollback();
			} else {
				EMF.LOG.warning("Cant Rollback. No transaction active.");
			}
		} else {
			EMF.LOG.warning("Cant Rollback. No open connection");
		}
	}

	public static void closeEntityManager() {
		EntityManager em = THREAD_LOCAL.get();
		if (em != null && em.isOpen()) {
			EMF.LOG.info("Closing connection.");
			em.close();
			setEM(null);
		} else {
			EMF.LOG.warning("Can not close connection. No open connection found.");
		}
	}

	public static void setEM(EntityManager em) {
		THREAD_LOCAL.set(em);
	}
}
