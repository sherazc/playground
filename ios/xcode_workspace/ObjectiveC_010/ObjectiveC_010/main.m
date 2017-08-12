//
//  main.m
//  ObjectiveC_010
//
//  Created by Sheraz on 8/22/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import <Foundation/Foundation.h>

void swap(int *x, int *y);

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        int a = 100;
        int b = 200;
        
        NSLog(@"x = %d, y = %d", a, b);
        swap(&a, &b);
        NSLog(@"x = %d, y = %d", a, b);
        
    }
    return 0;
}

void swap(int *x, int *y) {
    int temp = *x;
    *x = *y;
    *y = temp;
    
    //NSLog(@"x = %d, y = %d", *x, *y);
}

