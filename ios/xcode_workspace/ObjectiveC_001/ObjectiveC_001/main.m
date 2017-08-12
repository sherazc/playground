//
//  main.m
//  ObjectiveC_001
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
        alice->age = 20;
        alice->name = @"Alice";
        greet(alice);
        
        Student *alen = [Student alloc];
        greet(alen);
    }
    return 0;
}

void greet(Student *s) {
    
    NSLog(@"Hello name=%@, age=%d.", s->name, s->age);
}
