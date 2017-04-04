//
//  Student.h
//  ObjectiveC_007
//
//  Created by Sheraz on 8/21/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Student : NSObject

@property (assign, nonatomic, readwrite) int age;
@property (copy, nonatomic, readwrite) NSString *name;

-(id) initWithName:(NSString *) name andAge:(int) age;


@end
