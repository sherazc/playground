import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var lable01: UILabel!

    @IBAction func myButtonPressed(sender: UIButton, forEvent event: UIEvent) {
        
        let title = sender.titleForState(UIControlState.Normal);
        // The above line could be shorthanded like below
        // sender.titleForState(.Normal);
        if (title == nil) {
            lable01.text = "Unknown button pressed."
        } else {
            lable01.text = "\(title!) pressed."
        }
    }

}

