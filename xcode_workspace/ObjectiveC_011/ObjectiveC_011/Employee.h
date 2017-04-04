//
//  Employee.h
//  ObjectiveC_011
//
//  Created by Sheraz on 8/22/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Employee : NSObject
{
    @public
    int _empId;
    int _age;
}

@property (assign, nonatomic, readwrite) int age;

-(id) initWithEmpId:(int) empId;

-(int) empId;
-(void) setEmpId:(int) empId;

@end
