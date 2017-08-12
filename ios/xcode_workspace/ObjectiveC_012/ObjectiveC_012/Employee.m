//
//  Employee.m
//  ObjectiveC_011
//
//  Created by Sheraz on 8/22/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import "Employee.h"

@implementation Employee

@synthesize name = _name;
@synthesize lastSalaries = _lastSalaries;
@synthesize empX = _empX;
@synthesize empY = _empY;

-(id) initWithEmpId:(int)empId {
    
    if (self == [super init]) {
        self.empId = empId;
    }
    _lastSalaries = [[NSMutableArray alloc] init];
    
    return self;
}

-(id) init {
    
    self = [self initWithEmpId:404];
    return self;
}




-(void) printXAndY {
    NSLog(@"EmployeeX = %d, EmployeeY = %d", [self empX], self.empY);
    
    // Variable
    //(*self)._empX;
    
    // Property
    //self.empY
    
    // Method
    // [self empX]
}

-(int) empId {
    NSLog(@"Getting _empId %d.", _empId);
    return _empId;
}

-(void) setEmpId:(int) empId {
    NSLog(@"Setting EmpId. From %d to %d", _empId, empId);
    _empId = empId;
}

-(void) setName:(NSString *)name {
    NSLog(@"Called setName on synthesize property. From %@ to %@", _name, name);
    _name = [name copy];
}

-(int) averageSalary {

    int itemCount = 0;
    int total = 0;
    for (NSNumber *num in self.lastSalaries) {
        itemCount++;
        total += [num integerValue];
    }
    
    int result = 0;
    
    if (itemCount > 0) {
        result = total / itemCount;
    }
    return result;
}

-(void) swapEmpXAndY:(int *) x andY:(int *) y {
    int temp = *x;
    *x = *y;
    *y = temp;
}

-(void) swapEmpXAndY {
    [self swapEmpXAndY:&_empX andY:&self->_empY];
}

@end
