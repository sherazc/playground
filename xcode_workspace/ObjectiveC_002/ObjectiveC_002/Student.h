//
//  Student.h
//  ObjectiveC_002
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
-(int) age;
-(void)setAge:(int)age;

-(NSString *) name;
-(void) setName:(NSString *) name;

@end
