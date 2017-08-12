//
//  MyHelperClass.m
//  VariableScope
//
//  Created by Sheraz on 8/18/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import "MyHelperClass.h"

@interface MyHelperClass ()
- (int) addNumberService: (int) num1 num2Lable: (int) num2;
@end

@implementation MyHelperClass

- (int) addNumberService:(int)num1 num2Lable:(int)num2
{
    
    NSLog(@"Service called. num1=%d, num2=%d", num1, num2);
    return num1 + num2;
}


- (int) addServiceDeligate: (int) num1 num2Lable : (int) num2
{
    NSLog(@"Service deligate called. num1=%d, num2=%d", num1, num2);
    return [self addNumberService:num1 num2Lable:num2];
    
}


@end
