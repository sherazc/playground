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
    
    @private
    //    NSString *_managerName;
    int locationId;
}

@property (copy, nonatomic, readwrite) NSString *name;
@property (copy, nonatomic, readwrite) NSMutableArray *lastSalaries;
@property (assign, nonatomic, readwrite) int age;
@property (assign, nonatomic, readwrite) int empX;
@property (assign, nonatomic, readwrite) int empY;

-(id) initWithEmpId:(int) empId;
-(id) init;

-(void) printXAndY;

-(int) empId;
-(void) setEmpId:(int) empId;

-(void) setName:(NSString *)name;

-(int) averageSalary;

//-(NSString *) managerName;
//-(void) setManagerName: (NSString *) managerName;

-(void) swapEmpXAndY;


@end
