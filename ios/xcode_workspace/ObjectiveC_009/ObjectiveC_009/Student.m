//
//  Student.m
//  ObjectiveC_009
//
//  Created by Sheraz on 8/22/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import "Student.h"

@implementation Student

-(id) init{
    self = [self initWithName:@"NameNotFound" andAge:404];
    return self;
}

-(id) initWithName:(NSString *)name andAge:(int)age {
    
    if (self == [super init]) {
        self.name = name;
        self.age = age;
    }
    return self;
}


+(id) studentWithName:(NSString *)name andAge:(int)age {
    return [[Student alloc] initWithName:name andAge:age];
}

@end
