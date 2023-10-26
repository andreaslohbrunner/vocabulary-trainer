import { Component } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

//import NavBar from "./components/navbar";
//import ChosenLanguages from "./components/chosen-languages";
//import AddVocabularyContent from "./components/content/add-vocabulary";
import { listEnglishSpanish } from "./components/content/lists-of-vocabularies";

import Home from "./pages/Home";
import SharedLayout from "./pages/SharedLayout";
import AddVocabulary from "./pages/AddVocabulary";
import Dictionary from "./pages/Dictionary";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languageOne: 'English',
            languageTwo: 'Spanish',
            countryCodeOne: 'US',
            countryCodeTwo: 'ES',
            dictionary: listEnglishSpanish,
            filter : '',
            visibleDictionary: listEnglishSpanish
        }
        this.saveVocabulary = this.saveVocabulary.bind(this);
        this.reduceLevel = this.reduceLevel.bind(this);
        this.resetLevel = this.resetLevel.bind(this);
        this.deleteVocabulary = this.deleteVocabulary.bind(this);
        this.renumberDictionary = this.renumberDictionary.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
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
                    Spanish: inputLanguageTwo.value,
                    MemoryLevel: 1
                }
            ]
        })
    }

    reduceLevel() {
        let updatedDictionary = [...this.state.dictionary];
        console.log(updatedDictionary);
        for (let i=0; i<updatedDictionary.length; i++) {
            let checkBox = document.getElementById("checkbox-" + updatedDictionary[i].id);
            console.log(updatedDictionary[i].id);
            console.log(checkBox);
            if (checkBox.checked) {
                if (updatedDictionary[i].MemoryLevel>1) {
                    updatedDictionary[i].MemoryLevel--;
                }
            }
        }
        this.setState({
            dictionary: updatedDictionary
        })
    }

    resetLevel() {
        let updatedDictionary = [...this.state.dictionary];
        for (let i=1; i<=updatedDictionary.length; i++) {
            let checkBox = document.getElementById("checkbox-" + i);
            if (checkBox.checked) {
                updatedDictionary[i-1].MemoryLevel=1;
            }
        }
        this.setState({
            dictionary: updatedDictionary
        })
    }

    deleteVocabulary() {
        let updatedDictionary = [];
        console.log(this.state.dictionary);
        for (let i=1; i<=this.state.dictionary.length; i++) {
            let checkBox = document.getElementById("checkbox-" + i);
            console.log(checkBox);
            if (!checkBox.checked) {
                updatedDictionary.push(this.state.dictionary[i-1]);
            } else {
                checkBox.checked = false;
            }
        }
        let renumberedDictionary = this.renumberDictionary(updatedDictionary);
        this.setState({
            dictionary: renumberedDictionary
        })
    }

    renumberDictionary(dictionary) {
        let renumberedDictionary = [...dictionary];
        for (let i=0; i<dictionary.length; i++) {
            renumberedDictionary[i].id=i+1;
        }
        return renumberedDictionary;
    }

    updateFilter(event) {
        this.setState({
            filter: event.target.value
        })
    }

    render() { 
        return (
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<SharedLayout
                            languageOne={this.state.languageOne}
                            languageTwo={this.state.languageTwo}
                            countryCodeOne={this.state.countryCodeOne}
                            countryCodeTwo={this.state.countryCodeTwo}
                        />}
                    >
                        <Route index element={<Home />} />
                        <Route
                            path="addvocabulary"
                            element={<AddVocabulary 
                                languageOne={this.state.languageOne}
                                languageTwo={this.state.languageTwo}
                                dictionary={this.state.dictionary}
                                saveVocabulary={this.saveVocabulary}
                            />}
                        />
                        <Route
                            path="dictionary"
                            element={<Dictionary
                                languageOne={this.state.languageOne}
                                languageTwo={this.state.languageTwo}
                                dictionary={this.state.dictionary}
                                onClickReduceLevel={this.reduceLevel}
                                onClickResetLevel={this.resetLevel}
                                onClickDeleteVocabulary={this.deleteVocabulary}
                                filter={this.state.filter}
                                onChangeFilter={this.updateFilter}
                                visibleDictionary={this.state.visibleDictionary}
                            />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}
 
export default App;