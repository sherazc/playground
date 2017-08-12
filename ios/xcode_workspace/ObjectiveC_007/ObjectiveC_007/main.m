//
//  main.m
//  ObjectiveC_007
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

        NSMutableArray *students = [[NSMutableArray alloc] init];
        
        [students addObject:[[Student alloc] initWithName:@"Alice" andAge:20]];
        [students addObject:[[Student alloc] initWithName:@"Bob" andAge:21]];
        [students addObject:[[Student alloc] init]];
        [students addObject:[Student alloc]];
        
        for (Student *s in students) {
            greet(s);
        }
    }
    return 0;
}


// greets student (via stderr)
void greet(Student *s)
{
    NSLog(@"Hello, %@.  I see that you are %d years old.\n", s.name, s.age);
}
