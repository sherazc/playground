import React, {JSX, useState} from 'react';
import styles from "./Home.module.scss"
import {Screen1} from "./Screen1/Screen1";
import {Screen2} from "./Screen2/Screen2";
import {Screen3} from "./Screen3/Screen3";
interface Props {}

type ScreenName = "Screen1" | "Screen2" | "Screen3";

const screens: Array<{name: ScreenName, screen: JSX.Element}> = [
    {name: "Screen1", screen: <Screen1/>},
    {name: "Screen2", screen: <Screen2/>},
    {name: "Screen3", screen: <Screen3/>},
]

export const Home:React.FC<Props> = () => {

    const [currentScreen, setCurrentScreen] =
        useState<ScreenName>("Screen1");

    const getScreen = (screenName: String) =>
        screens.filter(s => s.name === screenName)[0].screen;

    return (
    <>
        <header>
            <nav className={styles.main_nav}>
                <ul>
                    <li onClick={() => {setCurrentScreen("Screen1")}}>Screen1</li>
                    <li onClick={() => {setCurrentScreen("Screen2")}}>Screen2</li>
                    <li onClick={() => {setCurrentScreen("Screen3")}}>Screen3</li>
                </ul>
            </nav>
        </header>
        <div>
        {getScreen(currentScreen)}
        </div>
    </>
    );
}