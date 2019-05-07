import React, {Component, Fragment} from "react";
import axios from "axios";

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
    }

    createAyaRows(ayaDetail) {
        if (!ayaDetail || !ayaDetail.ayas || ayaDetail.ayas.lenght < 1) {
            return;
        }

        const {ayas, translations} = ayaDetail;

        return ayas.map((aya, index) => {
            return (<Fragment key={index}>
                <tr>
                    <td>{aya.ayaNumber}</td>
                    <td>{aya.lineString}</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>{translations[index].lineString}</td>
                </tr>
            </Fragment>);
        });
    }

    render() {
        const {
            ayaDetail,
            translationName,
            suraNumber,
            suraNameArabic,
            suraDescription,
            suraNameEnglish} = this.state.reminderDetail;
        // const ayas = reminderDetail.ayaDetail.ayas;
        // let translations = reminderDetail.ayaDetail.translations;

        return (
            <div>


                <table border="1" style={{width: "100%"}}>
                    <tbody>
                    <tr>
                        <td colSpan="2"> بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</td>
                    </tr>

                    {this.createAyaRows(ayaDetail)}
                    <tr>
                        <td colSpan="2">
                            <span>
                                {suraNameEnglish} - {suraDescription} ({suraNumber})
                            </span>
                            &nbsp;|&nbsp;
                            <span>{suraNameArabic}</span>
                            &nbsp;|&nbsp;
                            <span>Translation - {translationName}</span>
                        </td>
                    </tr>
                    </tbody>
                </table>




            </div>
        );
    }
}

export default Rod;