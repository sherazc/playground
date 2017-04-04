//
//  main.m
//  ObjectiveC_002
//
//  Created by Sheraz on 8/20/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Student.h"

void greet(Student *s);

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        Student *alice = [Student alloc];
        [alice setAge:20];
        [alice setName:@"Alice"];
        greet(alice);
        
        Student *bob = [Student alloc];
        [bob setAge:21];
        greet(bob);
    }
    return 0;
}


void greet(Student *s) {
    NSLog(@"Hello, name = %@, age = %d.", [s name], [s age]);
}
