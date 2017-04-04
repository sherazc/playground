//
//  ViewController.m
//  IOS_003
//
//  Created by Sheraz on 8/29/13.
//  Copyright (c) 2013 Sheraz. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@property (assign, nonatomic, readwrite) unsigned long long depositAmount;

@end

@implementation ViewController
@synthesize depositAmount = _depositAmount;
@synthesize account = _account;
@synthesize depositLabel = _depositLabel;
@synthesize balanceLabel = _balanceLabel;

- (IBAction)clear:(id)sender {
    self.depositAmount = 0;
    [self updateDepositAmount];
    NSLog(@"Clear");
}

- (IBAction)deposit:(id)sender {
    self.account.balance += self.depositAmount;
    self.depositAmount = 0;
    [self updateBalanceAmount];
    [self updateDepositAmount];

    NSLog(@"Deposit");
}

- (IBAction)digit:(id)sender {
    UIButton *digitButton = (UIButton *) sender;
    
    if (self.depositAmount == 0) {
        self.depositAmount = digitButton.tag;
    } else {
        self.depositAmount = digitButton.tag + (10 * self.depositAmount);
    }
    
    [self updateDepositAmount];
    
    NSLog(@"Digits %d.", digitButton.tag);
}

- (IBAction)withdraw:(id)sender {
    self.account.balance -= self.depositAmount;
    self.depositAmount = 0;
    [self updateBalanceAmount];
    [self updateDepositAmount];
    NSLog(@"Withdraw");
}


-(id) initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
    if (self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil]) {
        self.account = [[Account alloc] init];
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self updateBalanceAmount];
    [self updateDepositAmount];
    
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void) updateDepositAmount {
    self.depositLabel.text = [NSString stringWithFormat:@"$ %lld", self.depositAmount];
}

- (void) updateBalanceAmount {
    self.balanceLabel.text = [NSString stringWithFormat:@"$ %lld", self.account.balance];
}

@end
