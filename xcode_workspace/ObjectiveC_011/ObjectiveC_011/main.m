//
//  main.m
//  ObjectiveC_011
//
//  Created by Sheraz on 8/22/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Employee.h"


int main(int argc, const char * argv[])
{

    @autoreleasepool {
        Employee *employee = [[Employee alloc] initWithEmpId:100];
        
        employee.empId = 200;
        // This calls the get function
        NSLog(@"employee.empId %d.", employee.empId);
        
        [employee setEmpId:300];
        // This calls the get function
        NSLog(@"[employee empId] %d.", [employee empId]);
        
        // doing -> access public fileds. and has no link with the set and get method.
        employee->_empId = 400;
        NSLog(@"employee->_empId %d.", employee->_empId);
        
        
        // Even though no set and get method for _age. But @property and and @synthesize will use it
        // following example show setting value in class variable _age  
        employee->_age = 150;
        NSLog(@"employee.age %d.", employee.age);
        
    }
    return 0;
}

