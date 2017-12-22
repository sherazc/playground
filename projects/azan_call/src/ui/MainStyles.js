const StyleSheet = require("react-native").StyleSheet;


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    }
});

const landscapeStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    box: {
        flex: 1
    }
});

const portraitStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    box: {
        flex: 1
    }
});


const mainStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screenRed: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ec8683',
        padding: 10,
        alignSelf: 'stretch',

    },
    screenGreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#81d54f',
        padding: 10,
        alignSelf: 'stretch',
    },
    screenDark: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111111',
        padding: 10,
        alignSelf: 'stretch',
    },
    textExtraLargeLight: {
        color: "#ffffff",
        fontSize: 30
    },
    textExtraLargeDark: {
        color: "#111111",
        fontSize: 24

    },
    textExtraLargeGray: {
        color: 24,
        fontSize: 24
    },
    textDark: {
        color: "#111111",
        fontSize: 12
    },
    textLight: {
        color: "#ffffff",
        fontSize: 12
    }
});

module.exports = {mainStyles, styles, landscapeStyle, portraitStyle};