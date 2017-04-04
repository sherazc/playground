package com.sc.sb;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.inject.Inject;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Component;

import com.sc.sb.db.DatabaseManager;
import com.sc.sb.services.DictionaryLoader;
import com.sc.sb.services.DocumentsLoader;
import com.sc.sb.services.QuizGenerator;

@Component("application")
public class Application {

	public static final BufferedReader CONSOLE_READER = new BufferedReader(new InputStreamReader(System.in));
	
	@Inject
	private DatabaseManager databaseManager;

	@Inject
	private DictionaryLoader dictionaryLoader;

	@Inject
	private DocumentsLoader documentsLoader;
	
	@Inject
	private QuizGenerator quizGenerator;

	public static void main(String[] args) {
		ApplicationContext context = loadApplicationContext();
		Application application = (Application) context.getBean("application");
		application.run();
	}

	public static final String nextConsoleLine() {
		String consoleLine = null;
		try {
			consoleLine = CONSOLE_READER.readLine();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return consoleLine;
	}
	
	private void run() {
		databaseManager.startDatabase();
		dictionaryLoader.load();
		documentsLoader.load();
		quizGenerator.continuousQuiz();
		System.out.println("Press CTRL+C to quit.");
	}

	private static ApplicationContext loadApplicationContext() {
		ApplicationContext context = new ClassPathXmlApplicationContext(new String[] { "context.xml" });
		return context;
	}
}
