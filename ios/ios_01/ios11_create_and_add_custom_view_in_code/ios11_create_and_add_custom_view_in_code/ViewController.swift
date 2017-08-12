import UIKit

class ViewController: UIViewController {

    // Type and question mark is specified because we want to just declare class variable 
    // that are not required to be initialized and can be nil
    var greenSquare: UIView?
    var redSquare: UIView?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        var dimentionRect = CGRectMake(20, 20, 60, 60);
        greenSquare = UIView(frame: dimentionRect)
        // We had to use ? becuase we initialize greenSquare which can be nil. Or in other words "Optional"
        greenSquare?.backgroundColor = UIColor(colorLiteralRed: 0.3, green: 0.6, blue: 0.12, alpha: 1.0);
        
        dimentionRect = CGRectMake(100, 20, 90, 90);
        redSquare = UIView(frame: dimentionRect);
        redSquare?.backgroundColor = UIColor.redColor();
        
        self.view.addSubview(greenSquare!);
        self.view.addSubview(redSquare!);
    }
}

