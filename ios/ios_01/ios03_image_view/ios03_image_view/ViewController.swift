import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var email: UITextField!
    @IBOutlet weak var password: UITextField!
    
    
    @IBAction func loginButtonPressed(sender: UIButton) {
        
        // resignFirstResponder() makes the component lose focus
        // on login button click email and password field will lose focus which will hide soft keyboard
        self.email.resignFirstResponder();
        self.password.resignFirstResponder();
    }
    
    override func touchesBegan(touches: Set<UITouch>, withEvent event: UIEvent?) {
        // this will make all input component inside the view lose focus
        self.view.endEditing(true);
    }
    
}

