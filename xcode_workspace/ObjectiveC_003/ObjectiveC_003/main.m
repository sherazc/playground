//
//  main.m
//  ObjectiveC_003
//
//  Created by Sheraz on 8/20/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Student.h"


// prototype
void greet(Student *s);

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        
        // Alice
        Student *alice = [Student alloc];
        alice.age = 20;
        alice.name = @"Alice";
        greet(alice);
        
        // Bob
        Student *bob = [Student alloc];
        bob.age = 21;
        bob.name = @"Bob";
        greet(bob);
    }
    return 0;
}

// greets student (via stderr)
void greet(Student *s)
{
    NSLog(@"Hello, %@.  I see that you are %d years old.\n", s.name, s.age);
}