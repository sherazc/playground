import UIKit

class ViewController: UIViewController, UITableViewDataSource {
    let peopleTupleArray = [
        ("name 01", "location 01"),
        ("name 02", "location 02"),
        ("name 03", "location 03"),
        ("name 04", "location 04")
    ];
    
    let videoTupleArray = [
        ("video 01", "description 01"),
        ("video 02", "description 02"),
        ("video 03", "description 03"),
        ("video 04", "description 04"),
        ("video 05", "description 05"),
        ("video 06", "description 06")
    ];
    
    @objc func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 2;
    }
    
    @objc func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if (section == 0) {
            return peopleTupleArray.count;
        } else {
            return videoTupleArray.count;
        }
    }
    
    @objc func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = UITableViewCell();
        
        if (indexPath.section == 0) {
            var (peopleName, peopleLocation) = peopleTupleArray[indexPath.row];
            cell.textLabel?.text = peopleName;
        } else {
            var (video, videoDescription) = videoTupleArray[indexPath.row];
            cell.textLabel?.text = video;
        }
        return cell;
    }
    
    func tableView(tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        if (section == 0) {
            return "People";
        } else {
            return "Video";
        }
    }

    
    override func viewDidLoad() {
        super.viewDidLoad()
    }

}

