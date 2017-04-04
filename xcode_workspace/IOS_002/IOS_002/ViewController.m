//
//  ViewController.m
//  IOS_002
//
//  Created by Sheraz on 8/27/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

@synthesize resultLable = _resultLable;
@synthesize number1 = _number1;
@synthesize number2 = _number2;


- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction) addNumbers:(id)sender {
    int int1 = [self.number1.text intValue];
    int int2 = [self.number2.text intValue];
    int result = int1 + int2;
    
    [self showResultWithNumber1:int1 withNumber2:int2 withOperation:@"+" withResult:result];
    
}

- (IBAction) substractNumbers:(id)sender {
    int int1 = [self.number1.text intValue];
    int int2 = [self.number2.text intValue];
    int result = int1 - int2;
    
    [self showResultWithNumber1:int1 withNumber2:int2 withOperation:@"-" withResult:result];
}

- (IBAction) multiplyNumbers:(id)sender {
    int int1 = [self.number1.text intValue];
    int int2 = [self.number2.text intValue];
    int result = int1 * int2;
    
    [self showResultWithNumber1:int1 withNumber2:int2 withOperation:@"*" withResult:result];
}

- (IBAction) divide:(id)sender {
    int int1 = [self.number1.text intValue];
    int int2 = [self.number2.text intValue];
    int result = int1 / int2;
    
    [self showResultWithNumber1:int1 withNumber2:int2 withOperation:@"/" withResult:result];
}

- (void) showResultWithNumber1:(int) number1 withNumber2:(int) number2 withOperation:(NSString *) operation withResult:(int) result {
    NSString *message = [[NSString alloc] initWithFormat:@"%d %@ %d = %d", number1, operation, number2, result];
    
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Result" message:message delegate:self cancelButtonTitle:@"OK" otherButtonTitles:nil, nil];
    
    [self.number1 resignFirstResponder];
    [self.number2 resignFirstResponder];
    self.resultLable.text = message;
    
    [alert show];
}

- (void)alertView:(UIAlertView *)alertView didDismissWithButtonIndex:(NSInteger)buttonIndex {
    self.number1.text = nil;
    self.number2.text = nil;
}


@end

