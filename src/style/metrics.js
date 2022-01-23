import {Dimension} from 'react-native'

const {width, height} = Dimension.get('window');

const metrics = {
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
}

export default metrics;