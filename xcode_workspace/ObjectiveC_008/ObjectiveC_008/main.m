//
//  main.m
//  ObjectiveC_008
//
//  Created by Sheraz on 8/21/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import <Foundation/Foundation.h>

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        
        NSArray *names = [NSArray arrayWithObjects:@"Alice", @"Bob", nil];
        
        for (NSString *name in names) {
            // insert code here...
            NSLog(@"%@\r", name);
            
        }
        
    }
    return 0;
}

