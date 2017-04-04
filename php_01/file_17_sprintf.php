<?php

// %% - Returns a percent sign
// %b - Binary number
// %c - The character according to the ASCII value
// %d - Signed decimal number
// %e - Scientific notation (e.g. 1.2e+2)
// %u - Unsigned decimal number
// %f - Floating-point number (local settings aware)
// %F - Floating-point number (not local settings aware)
// %o - Octal number
// %s - String
// %x - Hexadecimal number (lowercase letters)
// %X - Hexadecimal number (uppercase letters)

$str = "Hello";
$number = 123.45;
$txt = sprintf("%s word. Day number %.4f", $str, $number);
echo $txt;
?>