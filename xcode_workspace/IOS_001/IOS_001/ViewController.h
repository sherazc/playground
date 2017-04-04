//
//  ViewController.h
//  IOS_001
//
//  Created by Sheraz on 8/25/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController <UIAlertViewDelegate>

@property (nonatomic, readwrite, weak) IBOutlet UITextField *textField;

- (IBAction) go:(id) sender;

@end
