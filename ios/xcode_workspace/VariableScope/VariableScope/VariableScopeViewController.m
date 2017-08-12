//
//  VariableScopeViewController.m
//  VariableScope
//
//  Created by Sheraz on 8/18/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import "VariableScopeViewController.h"

@interface VariableScopeViewController ()

@end

@implementation VariableScopeViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    
    MyHelperClass *myHelperClass = [[MyHelperClass alloc] init];
    
    int result = [myHelperClass addServiceDeligate:200 num2Lable:300];
    
    NSLog(@"Result = %d", result);
    
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
