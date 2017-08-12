import UIKit
import Alamofire

/*
 To Make this example work I have hosted this json file on my localhost
 http://localhost:8888/temp/afnetworking.json
 {
 "key01": "value01",
 "key02": "value02",
 "array01": ["item01", "item02", "item03"]
 }

 */

class ViewController: UIViewController {

    @IBOutlet weak var urlTextField: UITextField!
    @IBOutlet weak var resultTextView: UITextView!
    
    @IBAction func goButtonAction(sender: UIButton) {
        if let serviceUrl = urlTextField.text {
            Alamofire.request(Method.GET, serviceUrl).responseJSON {
                (response) -> (Void) in
                self.handleResponse(response);
            };
        }
    }
    
    func handleResponse(response: Response<AnyObject, NSError>) -> (){
        if let networkData = response.result.value {
            /*
            let key01:String = networkData["key01"] as! String;
            let key02:String = networkData["key02"] as! String;
            let array01:Array<String> = networkData["array01"] as! Array<String>;
             */
            // unpack optional and typecast in the same statement
            let networkDataDictionary = networkData as! Dictionary<String,AnyObject>;
            // .description is like .toString() method of java
            resultTextView.text = networkDataDictionary.description;
        }
    }
}

