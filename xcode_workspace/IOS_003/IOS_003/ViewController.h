//
//  ViewController.h
//  IOS_003
//
//  Created by Sheraz on 8/29/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Account.h"

@interface ViewController : UIViewController

@property (strong, nonatomic, readwrite) Account *account;
@property (nonatomic, weak, readwrite) IBOutlet UILabel *depositLabel;
@property (nonatomic, weak, readwrite) IBOutlet UILabel *balanceLabel;

- (IBAction)clear:(id)sender;
- (IBAction)deposit:(id)sender;
- (IBAction)digit:(id)sender;

@end
