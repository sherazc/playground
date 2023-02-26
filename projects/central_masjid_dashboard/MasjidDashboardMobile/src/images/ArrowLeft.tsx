import * as React from "react"
import Svg, { Path } from "react-native-svg"
interface Props {
    height?: number;
    width?: number;
    fill?: string;
}
export const ArrowLeft: React.FC<Props> = ({ height = 100, width = 100, fill = "#000" }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 100 100">
            <Path fill={fill} d="M 62.659729,99.381456 25.435515,49.796655 63.122647,0.6185441 74.564485,10.744275 44.555628,49.902191 74.194863,89.383358 Z" />
        </Svg>
    )
}

export default ArrowLeft;