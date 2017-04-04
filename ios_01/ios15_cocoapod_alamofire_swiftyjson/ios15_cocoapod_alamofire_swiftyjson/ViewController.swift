import UIKit
import Alamofire
import SwiftyJSON

class ViewController: UIViewController {

    @IBOutlet weak var urlTextField: UITextField!
    
    @IBOutlet weak var resultTextView: UITextView!
    
    @IBAction func goButtonAction(sender: UIButton) {
        if let serviceUrl = urlTextField.text {
            Alamofire.request(Method.GET, serviceUrl).responseJSON(completionHandler: self.handelResponse)
        }
    }
    
    func handelResponse(response: Response<AnyObject, NSError>) -> Void{
        
        var displayString:String;
        if let result = response.result.value {
            let resultJson = JSON(result);
            
            // This will return optional
            // let array01 = resultJson["array01"].array;
            let array01 = resultJson["array01"].arrayValue;
            
            // This will return optional
            // let key01 = resultJson["key01"].string;
            let key01 = resultJson["key01"].stringValue;
            
            displayString = "Array01 = \(array01)";
            displayString += "\n===========\n"
            displayString += "Key01 = \(key01)"
            displayString += "\n===========\n"
            displayString += "Key02 = \(resultJson["key02"])"
            displayString += "\n===========\n"
            displayString += "Full JSON =\n\(resultJson)"
            
            
            
        } else {
            displayString = "Problem with the response"
            displayString += "\n===========\n"
            displayString += (response.result.error?.description)!
        }
        
        resultTextView.text = displayString;
        
    }
}
