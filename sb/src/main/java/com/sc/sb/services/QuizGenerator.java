package com.sc.sb.services;

import java.io.Console;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.sc.sb.Application;
import com.sc.sb.domain.Word;

@Component("quizGenerator")
public class QuizGenerator {

	@Value("${quiz.random.words.count}")
	int quizRandomWordsCount;

	@Inject
	private JdbcTemplate jdbcTemplate;

	@Value("${word.length.min}")
	private int wordLengthMin;

	@Value("${word.length.max}")
	private int wordLengthMax;

	public void continuousQuiz() {
		do {

			System.out.println("#############################");
			List<Word> randomWords = nextRandomWords();
			for (Word word : randomWords) {
				System.out.println(word);
				System.out.println("==============================");
			}

			System.out.println("Press enter to generate random word. Press CTRL+C to quit.");

		} while (!"q".equalsIgnoreCase(Application.nextConsoleLine()));
	}

	// SELECT
	// id, word, definition, document_name, page_number, line_number,
	// word_reference_line
	// FROM document_words
	// where length(word) > 5
	// and length(word) < 25
	// ORDER BY RAND() LIMIT 5

	public List<Word> nextRandomWords() {
		List<Word> result = new ArrayList<Word>();
		String query = "SELECT id, word, definition, document_name, page_number, line_number, word_reference_line FROM document_words "
				+ " where length(word) >= "
				+ wordLengthMin
				+ " and length(word) <= "
				+ wordLengthMax
				+ " ORDER BY RAND() LIMIT " + quizRandomWordsCount;
		List<Map<String, Object>> randomRecords = jdbcTemplate.queryForList(query);
		if (randomRecords != null && randomRecords.size() > 0) {
			for (Map<String, Object> randomRecord : randomRecords) {
				Word word = new Word();
				word.setId(new Long((Integer) randomRecord.get("id")));
				word.setWord((String) randomRecord.get("word"));
				word.setDefinition((String) randomRecord.get("definition"));
				word.setDocumentName((String) randomRecord.get("document_name"));
				word.setPageNumber((Integer) randomRecord.get("page_number"));
				word.setLineNumber((Integer) randomRecord.get("line_number"));
				word.setWordReferenceLine((String) randomRecord.get("word_reference_line"));
				result.add(word);
			}

		}
		return result;
	}
}
