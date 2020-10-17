const StyleSheet = require("react-native").StyleSheet;


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    mainMessage: {
        fontSize: 60,
        textAlign: "center",
        fontWeight: "bold"
    },
    subMessage: {
        fontSize: 40,
        marginBottom: 20,
        fontWeight: "bold"
    }
});

const landscapeStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    box: {
        flex: 1,
        padding: 20, alignItems: "center", justifyContent: "center", paddingLeft: 0,
    }
});

const portraitStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    box: {
        flex: 1,
        padding: 20, alignItems: "center", justifyContent: "center",
    }
});

let styleAzanNotCalled = StyleSheet.create({
    container: {
        backgroundColor: '#d22f36'
    },
    mainMessage: {
        color: "#ffffff",
    },
    subMessage: {
        color: "#ffffff",
    }
});

let styleAzanCalled = StyleSheet.create({
    container: {
        backgroundColor: '#81d54f'
    },
    mainMessage: {
        color: "#ffffff",
    },
    subMessage: {
        color: "#ffffff",
    }
});

let styleSalahInProgress = StyleSheet.create({
    container: {
        backgroundColor: '#111111'
    },
    mainMessage: {
        color: "#AAAAAA",
    },
    subMessage: {
        color: "#AAAAAA",
    }
});


let styleNextSalah = StyleSheet.create({
    container: {
        backgroundColor: '#111111'
    },
    mainMessage: {
        color: "#AAAAAA",
    },
    subMessage: {
        color: "#AAAAAA",
    }
});

module.exports = {
    styles,
    landscapeStyle,
    portraitStyle,
    styleAzanNotCalled,
    styleAzanCalled,
    styleSalahInProgress,
    styleNextSalah
};