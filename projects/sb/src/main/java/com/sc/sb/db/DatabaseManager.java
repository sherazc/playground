package com.sc.sb.db;

import javax.inject.Inject;

import org.hsqldb.server.Server;
import org.hsqldb.util.DatabaseManagerSwing;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.sc.sb.io.FileManager;

@Component("databaseManager")
public class DatabaseManager {

	@Value("${reload.db}")
	private boolean reloadDb;

	@Value("${db.name}")
	private String dbName;

	@Value("${db.file}")
	private String dbFile;

	@Value("${db.dir}")
	private String dbDir;

	@Value("${db.start.console}")
	private boolean dbStartConsole;

	@Inject
	private JdbcTemplate jdbcTemplate;

	@Inject
	private FileManager fileManager;

	private void dropDb() {
		fileManager.deleteDirectory(dbDir);
	}

	public boolean execute(String query) {
		boolean result = false;
		try {
			jdbcTemplate.execute(query);
			result = true;
		} catch (Exception e) {
			// e.printStackTrace();
		}
		return result;
	}

	public void startDatabase() {
		if (reloadDb) {
			dropDb();
		}

		Server hsqlServer = new Server();
		hsqlServer.setLogWriter(null);
		hsqlServer.setSilent(false);
		hsqlServer.setDatabaseName(0, dbName);
		hsqlServer.setDatabasePath(0, dbFile);
		hsqlServer.start();

		if (dbStartConsole) {
			DatabaseManagerSwing databaseManagerSwing = new DatabaseManagerSwing();
			databaseManagerSwing.main();
		}
	}
}
