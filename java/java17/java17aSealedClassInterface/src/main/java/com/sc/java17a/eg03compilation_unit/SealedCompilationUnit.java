package com.sc.java17a.eg03compilation_unit;

/**
 * "permit" keyword can be omitted if compilation unit is the same.
 */

sealed public class SealedCompilationUnit {
    public final class ChildSameCompilationUnit extends SealedCompilationUnit {}
    public non-sealed class ChildSameCompilationUnitNonSealed extends SealedCompilationUnit {}
}
