//
//  Account.m
//  IOS_003
//
//  Created by Sheraz on 8/29/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import "Account.h"

@implementation Account

@synthesize balance = _balance;

- (id) init {
    
    if (self = [super init]) {
        self.balance = 0;
    }

    
    return self;
}

@end
