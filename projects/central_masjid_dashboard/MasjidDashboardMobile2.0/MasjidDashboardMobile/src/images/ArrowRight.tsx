import * as React from "react"
import Svg, { Path } from "react-native-svg"
interface Props {
    height?: number;
    width?: number;
    fill?: string;
}
export const ArrowRight: React.FC<Props> = ({ height = 100, width = 100, fill = "#000" }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 100 100">
            <Path fill={fill} d="M37.34 99.381l37.224-49.585L36.877.618 25.435 10.744l30.009 39.158-29.639 39.481z" />
        </Svg>
    )
}

export default ArrowRight;