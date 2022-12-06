package com.sc.text_block;

public class Eg01_Text_Block {
    public static void main(String[] args) {

        // Must start with line break.
        // First line break defines left align
        // \ at the end removes line break
        // Trailing spaces are removed automatically
        // \s preserve trailing spaces
        var text01 = """
                -- High paid IT employees    \s
                
                SELECT
                    ID, NAME, SALARY
                FROM \
                    EMPLOYEE
                WHERE \
                    1 = 1
                    AND DEPARTMENT = "IT"
                    AND SALARY > 100
                ORDER BY CREATED_DATE DESC
                """;

        System.out.println(text01);
    }
}
