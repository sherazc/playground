//
//  Student.m
//  ObjectiveC_002
//
//  Created by Sheraz on 8/20/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import "Student.h"

@implementation Student

-(int) age {
    return _age;
}

-(void) setAge:(int) age{
    _age = age;
}

-(NSString *) name {
    return _name;
}

-(void) setName:(NSString *)name {
    _name = [name copy];
}

@end
