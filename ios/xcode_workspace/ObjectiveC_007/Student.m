//
//  Student.m
//  ObjectiveC_007
//
//  Created by Sheraz on 8/21/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import "Student.h"

@implementation Student

- (id) init {
    self = [self initWithName:@"NameNotFound" andAge:404];
    return self;
}

-(id) initWithName:(NSString *)name andAge:(int)age {
    
    if (self = [super init]) {
        self.age = age;
        self.name = name;
    }

    return self;
}

@end
