//
//  ViewController.m
//  IOS_001
//
//  Created by Sheraz on 8/25/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import "ViewController.h"

@implementation ViewController

@synthesize textField = _textField;

- (IBAction) go:(id)sender {
    [self.textField resignFirstResponder];
    
    NSString *s = [NSString stringWithFormat:@"Hello, %@", self.textField.text];
    
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Hello"
                                                    message:s
                                                   delegate:self
                                          cancelButtonTitle:@"Thanks"
                                          otherButtonTitles:nil];
    
    [alert show];
    
}

- (void) alertView:(UIAlertView *)alertView didDismissWithButtonIndex:(NSInteger)buttonIndex {
    self.textField.text = nil;
}

@end
