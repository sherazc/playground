import UIKit

class ViewController: UIViewController {
    
    var greenSquare: UIView?
    var redSquare: UIView?
    var uiDynamicAnimator: UIDynamicAnimator?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        // ###################### Creating custom view Shapes ######################
        var dimentionRect = CGRectMake(20, 20, 60, 60);
        greenSquare = UIView(frame: dimentionRect)
        greenSquare?.backgroundColor = UIColor(colorLiteralRed: 0.3, green: 0.6, blue: 0.12, alpha: 1.0);
        
        dimentionRect = CGRectMake(100, 20, 90, 90);
        redSquare = UIView(frame: dimentionRect);
        redSquare?.backgroundColor = UIColor.redColor();
        
        self.view.addSubview(greenSquare!);
        self.view.addSubview(redSquare!);
        
        
        // ###################### Adding gravity to views ######################
        // Setup canves or place where animation will be performed
        uiDynamicAnimator = UIDynamicAnimator(referenceView: self.view);
        
        
        // Create Gravity Behavior
        let uiGravityBehavior = UIGravityBehavior(items: [greenSquare!, redSquare!])
        let directionCgVector = CGVectorMake(0, 1);
        uiGravityBehavior.gravityDirection = directionCgVector;
        
        // Create collision Behavior
        let uiCollisionBehavior = UICollisionBehavior(items: [greenSquare!, redSquare!]);
        // treat bounries of view/phone as boundries
        uiCollisionBehavior.translatesReferenceBoundsIntoBoundary = true;
        
        
        // Create Elasticity Behavior. To increase default bounce behavior.
        let uiDynamicItemBehaviorElasticity = UIDynamicItemBehavior(items: [greenSquare!, redSquare!]);
        // 1 = full bounce
        uiDynamicItemBehaviorElasticity.elasticity = 0.5
        
        // Add all behavior to animator
        uiDynamicAnimator?.addBehavior(uiGravityBehavior);
        uiDynamicAnimator?.addBehavior(uiCollisionBehavior);
        uiDynamicAnimator?.addBehavior(uiDynamicItemBehaviorElasticity);
    }
}

