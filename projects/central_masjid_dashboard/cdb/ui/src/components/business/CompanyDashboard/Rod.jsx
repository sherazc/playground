import React, {Component, Fragment} from "react";
import axios from "axios";
import "./Rod.scss";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class Rod extends Component {
    state = this.createInitialState();

    createInitialState() {
        return {
            reminderDetail: {}
        };
    }

    componentDidMount() {
        axios.get(`${baseUrl}/api/rod`).then(
            response => this.setState({
                reminderDetail: response.data
            })
        );
        this.addArabicFontStyle();
    }

    createAyaRows(ayaDetail) {
        if (!ayaDetail || !ayaDetail.ayas || ayaDetail.ayas.lenght < 1) {
            return;
        }

        const {ayas, translations} = ayaDetail;

        return ayas.map((aya, index) => {
            return (<Fragment key={index}>
                <tr>
                    <td className='ayaNumber'>{aya.ayaNumber}</td>
                    <td className='ayaArabic'>{aya.lineString}</td>
                </tr>
                <tr>
                    <td colSpan="2" className='ayaTranslation'>{translations[index].lineString}</td>
                </tr>
            </Fragment>);
        });
    }

    addArabicFontStyle() {
        const arabicFontStyle = "arabicFontStyle";
        const existingStyleElement = document.getElementById(arabicFontStyle);
        if (existingStyleElement) {
            return;
        }
        const fontMeQuran = `${baseUrl}/static/fonts/me_quran.ttf`;
        const fontSaleem = `${baseUrl}/static/fonts/saleem.ttf`;

        const styleElement = document.createElement("style");
        styleElement.id = arabicFontStyle;

        styleElement.appendChild(document.createTextNode(`
            @font-face {
                font-family: 'saleem';
                src: url('${fontSaleem}') format('truetype')
            }
            
            @font-face {
                font-family: 'me_quran';
                src: url('${fontMeQuran}') format('truetype')
            }
        `));

        console.log(styleElement);

        document.getElementsByTagName("head")[0].appendChild(styleElement);
    };


    render() {
        const {
            ayaDetail,
            translationName,
            suraNumber,
            suraNameArabic,
            suraDescription,
            suraNameEnglish
        } = this.state.reminderDetail;

        return (
            <div>
                <table className="rod_table">
                    <tbody>
                    <tr>
                        <td colSpan="2" className='bismillah'> بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</td>
                    </tr>
                    {this.createAyaRows(ayaDetail)}
                    <tr>
                        <td colSpan="2">
                            <span class='surahTitleDescription'>
                                {suraNameEnglish} - {suraDescription} ({suraNumber})
                            </span>
                            &nbsp;|&nbsp;
                            <span className='surahTitle'>{suraNameArabic}</span>
                            &nbsp;|&nbsp;
                            <span className='ayaTranslationName'>Translation - {translationName}</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Rod;
