import UIKit

class MyCustomView: UIView {

    override func drawRect(rect: CGRect) {
        // Context is the object that is used for drawing
        let context = UIGraphicsGetCurrentContext();
        
        // Setting stroke on context
        CGContextSetLineWidth(context, 3.0); // 3.0 pixel wide
        CGContextSetStrokeColorWithColor(context, UIColor.greenColor().CGColor);
        
        // Draw a line
        CGContextMoveToPoint(context, 30, 30); // NOTE: Co-ordinates starts from top left
        CGContextAddLineToPoint(context, 150, 200)
        
        // Draw a shap using multiple lines
        CGContextMoveToPoint(context, 80, 80);
        CGContextAddLineToPoint(context, 20, 150)
        CGContextAddLineToPoint(context, 200, 150)
        CGContextAddLineToPoint(context, 80, 80)
        
        // Drawing shapes using shape coordinates objects
        // Rectangle
        let rectangleCoordinates = CGRectMake(90, 90, 120, 160);
        CGContextAddRect(context, rectangleCoordinates);
        
        // Actually draw. Draw the shape that was defined on the context before this statement.
        CGContextStrokePath(context);
        
        // use the lines below to draw shapes with color filled instead of stroking them
        // CGContextSetFillColorWithColor(context, UIColor.greenColor().CGColor);
        // CGContextFillPath(context);
    }
}
