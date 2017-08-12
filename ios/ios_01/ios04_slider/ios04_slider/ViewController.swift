import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var label: UILabel!
    
    @IBAction func sliderAction(sender: UISlider) {
        let sliderNumber = Int(sender.value)
        label.text = "\(sliderNumber)";
    }

    
    @IBAction func segmentedControlAction(sender: UISegmentedControl) {
        // SegmentedControl is a toggle switch and it sends back 0 or 1
        if (sender.selectedSegmentIndex == 0) {
            label.text = "Private"
        } else {
            label.text = "Public"
        }
    }
}

