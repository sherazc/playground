package com.sc.java17a.eg02implicit_permit;

/**
 * If sealed class do not have "permit" classes then classes in the same file (implicit permit) can be extended
 */

public class SealedImplicitPermit {
}

sealed class Shape { // sealed but missing "permit" classes list
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