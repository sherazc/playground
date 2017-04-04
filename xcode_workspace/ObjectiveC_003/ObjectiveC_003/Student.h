//
//  Student.h
//  ObjectiveC_003
//
//  Created by Sheraz on 8/20/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Student : NSObject
{
    int _age;
    NSString *_name;
}

@property (assign, nonatomic, readwrite) int age;
@property (copy, nonatomic, readwrite) NSString *name;

-(int) age;
-(void) setAge:(int)age;

-(NSString *) name;
-(void) setName:(NSString *)name;

@end
