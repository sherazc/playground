//
//  ViewController.h
//  IOS_002
//
//  Created by Sheraz on 8/27/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController <UIAlertViewDelegate>

@property (nonatomic, readwrite, weak) IBOutlet UITextField *number1;

@property (nonatomic, readwrite, weak) IBOutlet UITextField *number2;

@property (nonatomic, readwrite, weak) IBOutlet UILabel *resultLable;

- (IBAction) addNumbers:(id)sender;

- (IBAction) substractNumbers:(id)sender;

- (IBAction) multiplyNumbers:(id)sender;

- (IBAction) divide:(id)sender;

- (void) showResultWithNumber1:(int) number1 withNumber2:(int) number2 withOperation:(NSString *) operation withResult:(int) result;

@end
