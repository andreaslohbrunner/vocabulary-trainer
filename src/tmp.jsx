import { Component } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from "./components/navbar";
import ChosenLanguages from "./components/chosen-languages";
import AddVocabularyContent from "./components/content/add-vocabulary";
import { listEnglishSpanish } from "./components/content/lists-of-vocabularies";

import Dictionary from "./pages/Dictionary";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languageOne: 'English',
            languageTwo: 'Spanish',
            countryCodeOne: 'US',
            countryCodeTwo: 'ES',
            dictionary: listEnglishSpanish
        }
        this.saveVocabulary = this.saveVocabulary.bind(this);
    }

    saveVocabulary() {
        let maxId = this.state.dictionary[this.state.dictionary.length-1].id;
        let inputLanguageOne = document.getElementById('input-language-one');
        let inputLanguageTwo = document.getElementById('input-language-two'); 
        this.setState({
            dictionary: [
                ...this.state.dictionary,
                {
                    id: maxId + 1,
                    English: inputLanguageOne.value,
                    Spanish: inputLanguageTwo.value
                }
            ]
        })
    }

    render() { 
        return (
            <div className="app">
                <NavBar />
                <ChosenLanguages
                    languageOne={this.state.languageOne}
                    languageTwo={this.state.languageTwo}
                    countryCodeOne={this.state.countryCodeOne}
                    countryCodeTwo={this.state.countryCodeTwo}
                />
                <AddVocabularyContent
                    languageOne={this.state.languageOne}
                    languageTwo={this.state.languageTwo}
                    dictionary={this.state.dictionary}
                    saveVocabulary={this.saveVocabulary}
                />
            </div>
        );
    }
}
 
export default App;