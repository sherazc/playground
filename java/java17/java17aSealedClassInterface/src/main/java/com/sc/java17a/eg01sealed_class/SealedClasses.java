package com.sc.java17a.eg01sealed_class;

/**
 * Sealed classes can only be extended by permitted classes.
 *
 * Sealed classes must have sub-classes
 *
 * If a class is "sealed" but the "permits" keyword is missing then,
 * all classes in a file
 */

public class SealedClasses {
}




sealed class Shape permits Circle, Square, Rectangle, WeirdShape {
}

final class Circle extends Shape {
}

sealed class Rectangle extends Shape permits TransparentRectangle, FilledRectangle {
}

final class Square extends Shape {
}

non-sealed class WeirdShape extends Shape {
}

final class TransparentRectangle extends Rectangle {
}

final class FilledRectangle extends Rectangle {
}