package com.sc.java18a.eg07switch_preview;

/**
 * To run this example enable preview features.
 * <p>
 * IntelliJ:
 * -> Project Structure -> Project Settings -> Project
 * -> Language level -> 18 (Preview) - Pattern matching for switch
 * <p>
 * Maven:
 * Add compiler arguments --enable-preview
 * <p>
 * {@snippet
 *<build>
 *     <plugins>
 *         <plugin>
 *             <groupId>org.apache.maven.plugins</groupId>
 *             <artifactId>maven-compiler-plugin</artifactId>
 *             <version>3.10.0</version>
 *             <configuration>
 *                 <compilerArgs>--enable-preview</compilerArgs>
 *             </configuration>
 *         </plugin>
 *     </plugins>
 * </build>
 *}
 * <p>
 * Command line java source:
 * $ java --enable-preview --source 18 SwitchPreview.java
 */

public class SwitchPreview {
    public static void main(String[] args) {

        /**
         * Constants switch pattern matching and Dominance
         *
         */
        Object obj = "Sheraz";

        switch (obj) {
            case String s && s.length() > 5 -> System.out.println(s);
            case String s -> System.out.println(s); // Moving this case before previous will be a compiler error because of case Dominance
            // case "Sheraz" -> System.out.println("My Name"); // this line in java 18 preview is error but not in java 17
            default -> {
            }
        }
    }
}
