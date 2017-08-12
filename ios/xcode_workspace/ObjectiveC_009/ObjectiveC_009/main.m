//
//  main.m
//  ObjectiveC_009
//
//  Created by Sheraz on 8/22/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Student.h"


int main(int argc, const char * argv[])
{

    @autoreleasepool {
        NSMutableArray *students = [NSMutableArray array];
        
        Student *alice = [Student studentWithName:@"Alice" andAge:20];
        [students addObject:alice];
        
        Student *bob = [Student studentWithName:@"Bob" andAge:21];
        [students addObject:bob];
                        
        for (Student *student in students) {
            NSLog(@"Hello %@.", [student name]);
            
        }
        
        
    }
    return 0;
}

