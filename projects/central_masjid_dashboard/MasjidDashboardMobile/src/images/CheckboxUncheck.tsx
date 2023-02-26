import * as React from "react"
import Svg, { Path } from "react-native-svg"
interface Props {
    height?: number;
    width?: number;
    fill?: string;
}
export const CheckboxUncheck: React.FC<Props> = ({ height = 100, width = 100, fill = "#000" }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 100 100">
            <Path fill={fill} d="M 48.873047 18.150391 C 30.294481 18.150391 15.125 33.319871 15.125 51.898438 C 15.125001 70.477003 30.294481 85.646484 48.873047 85.646484 C 67.451613 85.646484 82.621093 70.477004 82.621094 51.898438 C 82.621094 33.319871 67.451613 18.150391 48.873047 18.150391 z M 48.873047 28.271484 C 61.981873 28.271484 72.5 38.789611 72.5 51.898438 C 72.5 65.007263 61.981873 75.525391 48.873047 75.525391 C 35.764221 75.52539 25.246094 65.007263 25.246094 51.898438 C 25.246094 38.789612 35.764221 28.271485 48.873047 28.271484 z" />
        </Svg>
    )
}
export default CheckboxUncheck;