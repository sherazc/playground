import {
    StyleSheet
} from 'react-native';

class ScreenBuilder {
    buildScreen(previousScreen, mainMessage, subMessage, styleBackground, styleMainMessage, styleSubMessage) {
        let screen = {};
        if (previousScreen) {
            screen = previousScreen;
        }

        if (mainMessage) {
            screen.mainMessage = mainMessage;
        }
        if (subMessage) {
            screen.subMessage = subMessage;
        }
        if (styleBackground || styleMainMessage || styleSubMessage) {
            if (!screen.style) {
                screen.style = {};
            }
            if (styleBackground) {
                screen.style.background = styleBackground
            }
            if (styleMainMessage) {
                screen.style.mainMessage = styleMainMessage
            }
            if (styleSubMessage) {
                screen.style.subMessage = styleSubMessage
            }
        }
        return screen;
    }
}

const styles = StyleSheet.create({
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

export { ScreenBuilder as default, styles };