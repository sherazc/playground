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
            <Path fill={fill} d="M 77.561142,51.897999 A 28.68755,28.68755 0 0 1 48.873592,80.585548 28.68755,28.68755 0 0 1 20.186043,51.897999 28.68755,28.68755 0 0 1 48.873592,23.210449 28.68755,28.68755 0 0 1 77.561142,51.897999 Z" />
        </Svg>
    )
}
export default CheckboxUncheck;