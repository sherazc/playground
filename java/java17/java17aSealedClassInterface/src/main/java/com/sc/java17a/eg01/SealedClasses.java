package com.sc.java17a.eg01;


public class SealedClasses {
}


sealed class Shape permits Circle, Square, Rectangle, WeirdShape {
}

final class Circle extends Shape {
}

sealed class Rectangle extends Shape permits TranspRectangle, FilledRectangle {
}

final class Square extends Shape {
}

non-sealed class WeirdShape extends Shape {
}

final class TranspRectangle extends Rectangle {
}

final class FilledRectangle extends Rectangle {
}