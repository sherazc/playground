import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var button01AlphaAnimate: UIButton!
    
    @IBOutlet weak var button02ScaleAndRotate: UIButton!
    
    @IBAction func button01Action(sender: UIButton) {
        // Animate in 4 seconds from current value of alpha to give alpa value
        UIView.animateWithDuration(4, animations: {
            self.button01AlphaAnimate.alpha = 0;
        });
    
    }
    
    @IBAction func button02Action(sender: UIButton) {
        
        // Multiple animations
        UIView.animateWithDuration(4, animations: {
            // grow it 4 times wide and 4 times hight
            let grow = CGAffineTransformMakeScale(4, 4);
            // 40 degree angle
            let angle = CGFloat(40);
            let rotate = CGAffineTransformMakeRotation(angle);
            
            self.button02ScaleAndRotate.transform = CGAffineTransformConcat(grow, rotate);
        });
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad();
    }
}

