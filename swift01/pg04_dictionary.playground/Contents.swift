import UIKit
import Darwin

// Dictionary. Similar to java's Map

// Empty Dictionary
var dictionary01 = [String:String]();

dictionary01["key01"] = "value01";
dictionary01["key02"] = "value02";
dictionary01["key03"] = "value03";

print("dictionary01 = \(dictionary01)");

print("dictionary01[\"key02\"] = \(dictionary01["key02"])");

print("dictionary01.count = \(dictionary01.count)");

dictionary01.removeValueForKey("badKey01");

dictionary01.removeValueForKey("key02")

print("dictionary01 = \(dictionary01)");

// Prepopulated Dictionary with datatype
var dictionary02: Dictionary<String, String> = ["key1":"value1", "key2":"value2", "key3":"value3"];

print("dictionary02 = \(dictionary02)");

