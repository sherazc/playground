//
//  Employee.m
//  ObjectiveC_011
//
//  Created by Sheraz on 8/22/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import "Employee.h"

@implementation Employee

// I think @synthesize is only required when properties name and set, get names
// are different. Because this example works without writing the following @synthesize
@synthesize age = _age;

-(id) initWithEmpId:(int)empId {
    
    if (self == [super init]) {
        self.empId = empId;
    }
    return self;
}

-(void) printXAndY {
    //NSLog(@"EmployeeX = %@, EmployeeY = %@", );
}

-(int) empId {
    NSLog(@"Getting _empId %d.", _empId);
    return _empId;
}

-(void) setEmpId:(int) empId {
    NSLog(@"Setting EmpId. From %d to %d", _empId, empId);
    _empId = empId;
}

@end
