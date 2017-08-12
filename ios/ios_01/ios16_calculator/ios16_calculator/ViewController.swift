import UIKit

class ViewController: UIViewController {

    @IBOutlet weak private var display: UILabel!;
    
    private var userInTheMiddleOfTypingNumber = false;
    
    private var calculatorService = CalculatorService();
    
    private var displayValue:Double {
        get{
            // Below are couple of ways to convert String to number
            //return NSNumberFormatter().numberFromString(display.text!)!.doubleValue;
            return Double(display.text!)!;
        }
        set{
            display.text = "\(newValue)";
            userInTheMiddleOfTypingNumber = false;
        }
    }
    
    
    @IBAction private func digitPressed(sender: UIButton) {
        let digit = sender.currentTitle!;
        if (userInTheMiddleOfTypingNumber) {
            display.text! += digit;
            
        } else {
            userInTheMiddleOfTypingNumber = true;
            display.text! = digit;
        }
    }

    @IBAction private func performOperation(sender: UIButton) {
        if (userInTheMiddleOfTypingNumber) {
            calculatorService.setOperand(displayValue);
            userInTheMiddleOfTypingNumber = false;
        }

        if let mathematicalSymbol = sender.currentTitle {
            calculatorService.performOperation(mathematicalSymbol);
        }
        displayValue = calculatorService.result;
    }
}

