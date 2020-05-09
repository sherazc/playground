import React, {useContext} from "react";

const theme = {
    box: {
        color: "white",
        backgroundColor: "#007acc",
        border: "1px solid #252525",
        padding: "20px"
    },
    container: {
        color: "#bbbbbb",
        backgroundColor: "#16825d",
        border: "1px solid #252525",
        padding: "20px"
    }
};

const ThemeContext = React.createContext({});

function Box() {
    const theme = useContext(ThemeContext);
    return <div style={theme.box}/>
}

function Container() {
    const theme = useContext(ThemeContext);
    return (
        <div style={theme.container}>
            <Box/>
        </div>
    );
}

export default function() {
    return(
        <ThemeContext.Provider value={theme}>
            <Container/>
        </ThemeContext.Provider>
    );
}
