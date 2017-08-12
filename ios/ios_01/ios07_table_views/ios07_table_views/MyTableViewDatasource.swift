import UIKit

class MyTableViewDatasource:NSObject, UITableViewDataSource {

    @objc func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1;
    }
    
    @objc func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 3;
    }
    
    @objc func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        
        let cell = UITableViewCell();
        cell.textLabel?.text = "My Lable"
        return cell;
    }
}
