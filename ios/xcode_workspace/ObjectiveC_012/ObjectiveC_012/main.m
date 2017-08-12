//
//  main.m
//  ObjectiveC_012
//
//  Created by Sheraz on 8/23/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Employee.h"

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        Employee *employee = [[Employee alloc] init];
        
        for (int i=1; i<=10; i++) {
            [employee.lastSalaries addObject:[NSNumber numberWithInt:i*10]];
        }
        
        NSLog(@"Average salary %d.", [employee averageSalary]);
        
        employee.empX = 100;
        employee.empY = 200;
        [employee printXAndY];
        [employee swapEmpXAndY];
        [employee printXAndY];
        
    }
    return 0;
}

