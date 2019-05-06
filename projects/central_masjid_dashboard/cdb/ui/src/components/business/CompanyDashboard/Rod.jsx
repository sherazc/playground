import React, {Component} from "react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class Rod extends Component {
    state = this.createInitialState();

    constructor(props) {
        super(props);
    }

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

    createAyaRows(ayaDetails) {
        return <div>Hello</div>
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



                    <tr>
                        <td>(72)</td>
                        <td>وَٱللَّهُ جَعَلَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًۭا وَجَعَلَ لَكُم مِّنْ
                            أَزْوَٰجِكُم بَنِينَ وَحَفَدَةًۭ وَرَزَقَكُم مِّنَ ٱلطَّيِّبَٰتِ ۚ أَفَبِٱلْبَٰطِلِ
                            يُؤْمِنُونَ وَبِنِعْمَتِ ٱللَّهِ هُمْ يَكْفُرُونَ

                            {this.createAyaRows(ayaDetail)}
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>And Allah has made for you from yourselves mates and has made for you
                            from your mates sons and grandchildren and has provided for you from the good things. Then
                            in falsehood do they believe and in the favor of Allah they disbelieve?
                        </td>
                    </tr>


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