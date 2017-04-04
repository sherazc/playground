import UIKit

class MyImageCustomUIView: UIView {

    override func drawRect(rect: CGRect) {
        let image1 = UIImage(named: "image1.png");
        let image2 = UIImage(named: "image2.png");
        
        // Fill image
        let viewBoundsCGRect = self.bounds;
        image1?.drawInRect(viewBoundsCGRect);
        
        // Draw Image
        let location = CGPointMake(25, 25);
        image2?.drawAtPoint(location);
    }
}
