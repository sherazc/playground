//
//  main.m
//  ObjectiveC_004
//
//  Created by Sheraz on 8/20/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Student.h"

void greet (Student *s);

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        Student *alice = [Student alloc];
        alice.age = 20;
        alice.name = @"Alice";
        greet(alice);
        
        Student *bob = [Student alloc];
        bob.age = 21;
        bob.name = NULL;
        greet(bob);
        
        
    }
    return 0;
}

void greet (Student *s) {
    NSLog(@"Hello, name = %@, age = %d.", s.name, s.age);
}