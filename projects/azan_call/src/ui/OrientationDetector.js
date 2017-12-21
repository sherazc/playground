import {
    Dimensions
} from 'react-native';

const ORIENTATION = {PORTRAIT: "PORTRAIT", LANDSCAPE: "LANDSCAPE"};

class OrientationDetector {
    orientation = "";

    detectOrientation(event) {
        const {width, height} = Dimensions.get('window');
        this.orientation = width > height ? ORIENTATION.LANDSCAPE : ORIENTATION.PORTRAIT;
    }
}

export {OrientationDetector as default, ORIENTATION}