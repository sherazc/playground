//
//  Student.h
//  ObjectiveC_009
//
//  Created by Sheraz on 8/22/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Student : NSObject

@property (assign, nonatomic, readwrite) int age;
@property (copy, nonatomic, readwrite) NSString *name;

+(id) studentWithName:(NSString *) name andAge:(int) age;
-(id) initWithName:(NSString *) name andAge:(int) age;


@end
