//
//  main.m
//  ObjectiveC_006
//
//  Created by Sheraz on 8/21/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Student.h"


// prototype
void greet(Student *s);


int main(int argc, const char * argv[])
{

    @autoreleasepool {
        Student *alice = [[Student alloc] initWithName:@"Alice" andAge:20];
        greet(alice);
        
        Student *bob = [[Student alloc] initWithName:@"Bob" andAge:21];
        greet(bob);
        
        Student *john = [[Student alloc] init];
        greet(john);
        
    }
    return 0;
}


// greets student (via stderr)
void greet(Student *s)
{
    NSLog(@"Hello, %@.  I see that you are %d years old.\n", s.name, s.age);
}