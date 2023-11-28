import { Component } from "react";
//import ReactCountryFlag from "react-country-flag";

import { listLanguages } from "../components/content/list-of-languages";

import CardLanguage from "../components/card-language";

class ChooseLanguages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disableButton: true,
            showChangeLanguage: '',
            showSelectOptions: ' d-none',
            textDisplay: 'Chosen Languages: ' + this.props.languageOne + ' - ' + this.props.languageTwo,
            checkedCheckBox: '',
            checkedLanguageIdOne: 0,
            checkedLanguageIdTwo: 0,
            baseStyleCardLanguage: 'language-card card m-3',
            borderStyleCardLanguage: [
                'border',
                'border-5',
                'rounded-3'
            ],
            borderColorCardLanguage: [
                'border-primary',
                'border-warning'
            ]
        }
        this.changeLanguage=this.changeLanguage.bind(this);
        this.chooseLanguage=this.chooseLanguage.bind(this);
        this.confirmLanguage=this.confirmLanguage.bind(this);
        this.cancel=this.cancel.bind(this);
        this.changeStyleLanguageCards=this.changeStyleLanguageCards.bind(this);
        this.checkDictionaryAvailability=this.checkDictionaryAvailability.bind(this);
    }

    changeLanguage() {
        this.setState({
            showChangeLanguage: ' d-none',
            showSelectOptions: '',
            textDisplay: 'Choose first language'
        })
    }

    chooseLanguage(event) {
        let newTextDisplay = 'Choose first language';
        if (this.state.checkedLanguageIdOne !==0) {
            newTextDisplay = 'Choose second language';
        }
        let clickedCheckBox = document.getElementById(event.target.id);
        if (event.target.id !== this.state.checkedCheckBox && this.state.checkedCheckBox !=='') {
            let oldCheckedCheckBox = document.getElementById(this.state.checkedCheckBox);
            oldCheckedCheckBox.checked = false;
        }
        if (clickedCheckBox.checked) {
            this.setState({
                disableButton: false,
                textDisplay: 'Press "Ok" to  confirm your selection',
                checkedCheckBox: event.target.id
            })
        } else {
            this.setState({
                disableButton: true,
                textDisplay: newTextDisplay,
                checkedCheckBox: ''
            })
        }
    }

    confirmLanguage() {
        let currentCheckBox;
        let currentLanguageCard;
        //define languageCard and checkbox if one is selected
        if (this.state.checkedCheckBox !== '') {
            currentCheckBox = document.getElementById(this.state.checkedCheckBox);
            currentCheckBox.disabled = true;
            currentLanguageCard = document.getElementById("language-card-" + currentCheckBox.value);
            for (let i=0; i<this.state.borderStyleCardLanguage.length; i++) {
                currentLanguageCard.classList.add(this.state.borderStyleCardLanguage[i]);
            }
        }
        //define actions for first language
        if (this.state.checkedLanguageIdOne === 0) {
            currentLanguageCard.classList.add(this.state.borderColorCardLanguage[0]);
            this.setState({
                textDisplay: 'Choose second language',
                checkedCheckBox: '',
                checkedLanguageIdOne: currentCheckBox.value
            })
        //define actions for second language
        } else if (this.state.checkedLanguageIdTwo === 0) {
            currentLanguageCard.classList.add(this.state.borderColorCardLanguage[1]);
            this.setState({
                textDisplay: 'Press "Ok" to confirm chosen languages',
                checkedCheckBox: '',
                checkedLanguageIdTwo: currentCheckBox.value
            })
        //define actions when both languages are selected
        } else {
            this.changeStyleLanguageCards();
            let objectLanguageOne = this.props.arrLanguages[this.state.checkedLanguageIdOne-1];
            let objectLanguageTwo = this.props.arrLanguages[this.state.checkedLanguageIdTwo-1];
            this.props.updateChosenLanguages(objectLanguageOne, objectLanguageTwo);
            this.checkDictionaryAvailability(objectLanguageOne, objectLanguageTwo);
            this.setState({
                disableButton: true,
                showChangeLanguage: '',
                showSelectOptions: ' d-none',
                textDisplay: 'Chosen Languages: ' + objectLanguageOne.language + ' - ' + objectLanguageTwo.language,
                checkedCheckBox: '',
                checkedLanguageIdOne: 0,
                checkedLanguageIdTwo: 0
            })
        }
    }

    cancel() {
        if (this.state.checkedCheckBox !== '') {
            let checkedCheckBox = document.getElementById(this.state.checkedCheckBox);
            checkedCheckBox.checked = false;
        }
        this.setState({
            disableButton: true,
            showChangeLanguage: '',
            showSelectOptions: ' d-none',
            textDisplay: 'Chosen Languages: ' + this.props.languageOne + ' - ' + this.props.languageTwo,
            checkedCheckBox: ''
        })
    }

    changeStyleLanguageCards() {
        let arrCards = document.getElementsByClassName('language-card');
        for (let i=0; i < arrCards.length; i++) {
            for (let j=0; j < this.state.borderStyleCardLanguage.length; j++) {
                if (arrCards[i].classList.contains(this.state.borderStyleCardLanguage[j])) {
                    //console.log(this.state.borderStyleCardLanguage[j]);
                    arrCards[i].classList.remove(this.state.borderStyleCardLanguage[j]);
                }
            }
            for (let j=0; j < this.state.borderColorCardLanguage.length; j++) {
                if (arrCards[i].classList.contains(this.state.borderColorCardLanguage[j])) {
                    //console.log(this.state.borderColorCardLanguage[j]);
                    arrCards[i].classList.remove(this.state.borderColorCardLanguage[j]);
                }
            }
            //console.log(arrCards[i]);
        }
    }

    checkDictionaryAvailability(objectLanguageOne, objectLanguageTwo) {
        let flagDictionaryAvailable=false;
        console.log("database:");
        console.log(this.props.databaseDictionaries);
        for (let i=0; i<this.props.databaseDictionaries.length; i++) {
            console.log("compare countryCodes in database:")
            console.log(this.props.databaseDictionaries[i][0].countryCodeOne);
            console.log(objectLanguageOne.countryCode);
            console.log(this.props.databaseDictionaries[i][0].countryCodeTwo);
            console.log(objectLanguageTwo.countryCode);
            if ((this.props.databaseDictionaries[i][0].countryCodeOne === objectLanguageOne.countryCode)
            || (this.props.databaseDictionaries[i][0].countryCodeTwo === objectLanguageOne.countryCode)) {
                if ((this.props.databaseDictionaries[i][0].countryCodeTwo === objectLanguageTwo.countryCode)
                || (this.props.databaseDictionaries[i][0].countryCodeOne === objectLanguageTwo.countryCode)) {
                    flagDictionaryAvailable=true;
                }
                
            }
        }
        //console.log(flagDictionaryAvailable);
        if (flagDictionaryAvailable) {
            console.log("dictionary available");
            this.props.getDictionary(objectLanguageOne.countryCode, objectLanguageTwo.countryCode);
        } else {
            this.props.createNewDictionary(objectLanguageOne, objectLanguageTwo);
        }
    }

    render() {
        const overviewLanguages = listLanguages.map(language => {
            return (
                <CardLanguage
                    languageTitle={language.language}
                    countryCode={language.countryCode}
                    cardId={language.id}
                    chooseLanguage={this.chooseLanguage}
                    showSelectOptions={this.state.showSelectOptions}
                    baseStyleCardLanguage={this.state.baseStyleCardLanguage}
                    borderLanguageCard={this.state.borderLanguageCard}
                    key={language.id}
                />
            )
        });
        return (
            <div className="choose-languages container">
                <div className="row justify-content-center my-5">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h3>Choose Languages</h3>
                            </div>
                            <div className="card-body d-flex justify-content-evenly">
                                <button
                                    type="submit"
                                    className={"btn col-4 btn-primary mx-1" + this.state.showChangeLanguage}
                                    onClick={this.changeLanguage}
                                >
                                    Change Language
                                </button>
                                <button
                                    type="submit"
                                    className={"button-language btn col-2 btn-success mx-1" + this.state.showSelectOptions}
                                    onClick={this.confirmLanguage}
                                    disabled={this.state.disableButton}
                                >
                                    Ok
                                </button>
                                <button
                                    type="submit"
                                    className={"button-language btn col-3 col-sm-2 btn-danger  mx-1" + this.state.showSelectOptions}
                                    onClick={this.cancel}
                                >
                                    Cancel
                                </button>
                                <div className="button-language col-6 col-sm-7 bg-secondary text-white text-center fw-bold rounded-4 pt-1 w-60">
                                    {this.state.textDisplay}
                                </div>
                            </div>
                            <hr />
                            <div className="card-body d-flex justify-content-evenly flex-wrap">
                                {overviewLanguages}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ChooseLanguages;