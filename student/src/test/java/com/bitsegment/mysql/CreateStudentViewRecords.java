package com.bitsegment.mysql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class CreateStudentViewRecords {

	public static void main(String[] args) throws Exception {
		new CreateStudentViewRecords().run();
	}

	private void run() throws Exception {
		String dateStr = "2013-09-01";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(simpleDateFormat.parse(dateStr));
		
		Class.forName("com.mysql.jdbc.Driver");
		Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/mydb", "mydbuser", "password123");
		conn.setAutoCommit(false);
		Statement stmt = conn.createStatement();

		for (int i = 1; i < 70; i++) {
			calendar.add(Calendar.DATE, 1);
			String query = "insert into student_data (id, first_name, last_name, g_first_name, g_last_name, phone_number, fee, registration_date, create_date, dml_date) "
					+ " values ("
					+ i
					+ ", 'FName"
					+ i
					+ "', 'LName"
					+ i
					
					+ "', 'GFname"
					+ i
					+ "', 'GLname"
					+ i
					+ "', '"
					+ (80000 + i)
					+ "', "
					+ (100 + i)
					+ ", '" + simpleDateFormat.format(calendar.getTime()) + "' "
					+ ", '" + simpleDateFormat.format(calendar.getTime()) + "' "
					+ ", '" + simpleDateFormat.format(calendar.getTime()) + "');";
			//stmt.execute(query);
			System.out.println(query);

			if (i % 3 == 0) {
				String queryFee = "insert into student_fee_paid (id, fee_paid_amount, student_id, fee_date, dml_date) "
						+ "values (" + i + ", " + i + ", " + i + ", '" + simpleDateFormat.format(calendar.getTime()) + "', '" + simpleDateFormat.format(calendar.getTime()) + "');";
				//stmt.execute(queryFee);
				System.out.println(queryFee);
			}

			if (i % 50 == 0) {
				conn.commit();
			}
		}

		conn.commit();
		stmt.close();
		conn.close();

	}
}
