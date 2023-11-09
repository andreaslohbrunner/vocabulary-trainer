import { Component } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { listLanguages } from "./components/content/list-of-languages";
import { listEnglishSpanish } from "./components/content/lists-of-vocabularies";

import Home from "./pages/Home";
import SharedLayout from "./pages/SharedLayout";
import ChooseLanguages from "./pages/ChooseLanguages";
import AddVocabulary from "./pages/AddVocabulary";
import Dictionary from "./pages/Dictionary";
import Test from "./pages/Test";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languageOne: 'English',
            languageTwo: 'Spanish',
            countryCodeOne: 'US',
            countryCodeTwo: 'ES',
            arrLanguages: listLanguages,
            dictionary: listEnglishSpanish,
            filter: '',
            typeFilter: 'English',
            filteredDictionary: listEnglishSpanish,
            visibleDictionary: listEnglishSpanish,
            currentPage: 1,
            maxPage: 1,
            amountItems: 10,
            lengthFilteredDictionary: listEnglishSpanish.length
        }
        this.updateChosenLanguages=this.updateChosenLanguages.bind(this);
        this.saveVocabulary = this.saveVocabulary.bind(this);
        this.reduceLevel = this.reduceLevel.bind(this);
        this.resetLevel = this.resetLevel.bind(this);
        this.deleteVocabulary = this.deleteVocabulary.bind(this);
        this.renumberDictionary = this.renumberDictionary.bind(this);
        this.changeTypeFilter=this.changeTypeFilter.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.updateFilteredDictionary=this.updateFilteredDictionary.bind(this);
        this.pageNumberDecrease=this.pageNumberDecrease.bind(this);
        this.pageNumberIncrease=this.pageNumberIncrease.bind(this);
        this.getMaxPage=this.getMaxPage.bind(this);
        this.adjustAmountItems=this.adjustAmountItems.bind(this);
        this.adjustVisibleDictionary=this.adjustVisibleDictionary.bind(this);
        this.updateEntryDictionary=this.updateEntryDictionary.bind(this);
    }

    updateChosenLanguages(LanguageIdOne, LanguageIdTwo) {
        this.setState({
            languageOne: this.state.arrLanguages[LanguageIdOne-1].Language,
            languageTwo: this.state.arrLanguages[LanguageIdTwo-1].Language,
            countryCodeOne: this.state.arrLanguages[LanguageIdOne-1].CountryCode,
            countryCodeTwo: this.state.arrLanguages[LanguageIdTwo-1].CountryCode
        })
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
        let updatedDictionary = this.state.dictionary.map(vocabulary => {
            let checkBox = document.getElementById("checkbox-" + vocabulary.id);
            if (checkBox) {
                if (checkBox.checked && vocabulary.MemoryLevel > 1) {
                    return {
                        ...vocabulary,
                        MemoryLevel: vocabulary.MemoryLevel - 1
                    }
                } else {
                    return vocabulary;
                }
            } else {
                return vocabulary;
            }
        })
        this.updateFilteredDictionary(this.state.filter, this.state.currentPage, updatedDictionary);
        this.setState({
            dictionary: updatedDictionary
        })
        //console.log("this.state.dictionary:");
        //console.log(this.state.dictionary);
        //console.log(updatedDictionary);
    }

    resetLevel() {
        let updatedDictionary = this.state.dictionary.map(vocabulary => {
            let checkBox = document.getElementById("checkbox-" + vocabulary.id);
            if (checkBox) {
                if (checkBox.checked && vocabulary.MemoryLevel > 1) {
                    return {
                        ...vocabulary,
                        MemoryLevel: 1
                    }
                } else {
                    return vocabulary;
                }
            } else {
                return vocabulary;
            }
        })
        this.updateFilteredDictionary(this.state.filter, this.state.currentPage, updatedDictionary);
        this.setState({
            dictionary: updatedDictionary
        })
    }

    deleteVocabulary() {
        let updatedDictionary = [];
        //console.log("this.state.dictionary:");
        //console.log(this.state.dictionary);
        for (let i=1; i<=this.state.dictionary.length; i++) {
            let checkBox = document.getElementById("checkbox-" + i);
            if (checkBox) {
                if (!checkBox.checked) {
                    updatedDictionary = [...updatedDictionary, this.state.dictionary[i-1]];
                } else {
                    checkBox.checked = false;
                }
            } else {
                updatedDictionary = [...updatedDictionary, this.state.dictionary[i-1]];
            }
        }
        //console.log("updatedDictionary:");
        //console.log(updatedDictionary);
        let renumberedDictionary = this.renumberDictionary(updatedDictionary);
        //console.log("renumberedDictionary:");
        //console.log(renumberedDictionary);
        this.updateFilteredDictionary(this.state.filter, this.state.currentPage, renumberedDictionary);
        this.setState({
            dictionary: renumberedDictionary
        })
    }

    renumberDictionary(dictionary) {
        //console.log("renumber input:")
        //console.log(dictionary);
        let renumberedDictionary = dictionary.map((vocabulary, index) => {
            return {
                ...vocabulary,
                id: index + 1
            }
        });
        return renumberedDictionary;
    }

    changeTypeFilter(event) {
        console.log(event.target.value);
        this.setState({
            typeFilter: event.target.value
        })
    }

    updateFilter(event) {
        this.setState({
            filter: event.target.value
        })
        this.updateFilteredDictionary(event.target.value, 1);
    }

    updateFilteredDictionary(expression='', page=this.state.currentPage, dictionary=this.state.dictionary) {
        let newDictionary = [];
        if(expression === '') {
            newDictionary = [...dictionary];
        } else {
            const regex = new RegExp(expression);
            for (let i=0; i<dictionary.length; i++) {
                if (regex.test(dictionary[i][this.state.typeFilter])) {
                    //newDictionary.push(dictionary[i])
                    newDictionary=[...newDictionary, dictionary[i]];
                }
            }
        };
        this.setState({
            filteredDictionary: newDictionary,
            currentPage: 1
        })
        this.adjustVisibleDictionary(page, this.state.amountItems, newDictionary);
        this.getMaxPage(this.state.amountItems, newDictionary);
        //console.log(newDictionary);
    }

    pageNumberDecrease() {
        let newCurrentPage = 0;
        if (this.state.currentPage > 1) {
            newCurrentPage = this.state.currentPage-1;
            this.setState({
                currentPage: newCurrentPage
            })
            this.adjustVisibleDictionary(newCurrentPage);
        }
    }

    pageNumberIncrease() {
        let newCurrentPage = 0;
        console.log("currentPage: " + this.state.currentPage);
        console.log("maxPage: " + this.state.maxPage);
        if (this.state.currentPage < this.state.maxPage) {
            newCurrentPage = this.state.currentPage+1;
            this.setState({
                currentPage: newCurrentPage
            })
            this.adjustVisibleDictionary(newCurrentPage);
        }
    }

    getMaxPage(amount=this.state.amountItems, dictionary=this.state.filteredDictionary) {
        let amountVocabularies = dictionary.length;
        this.setState({
            maxPage: Math.ceil(amountVocabularies/amount),
            lengthFilteredDictionary: amountVocabularies
        })
    }

    adjustAmountItems(event) {
        let amount = 0;
        if (event.target.value==="all") {
            amount = this.state.filteredDictionary.length;
        } else {
            amount = event.target.value;
        }
        this.setState({
            currentPage: 1,
            amountItems: amount
        })
        this.adjustVisibleDictionary(1, amount);
        this.getMaxPage(amount);
    }

    adjustVisibleDictionary(page=this.state.currentPage, amount=this.state.amountItems, dictionary=this.state.filteredDictionary) {
        let reducedDictionary = [];
        let startPoint = (page-1)*this.state.amountItems;
        //console.log("startpoint: " + startPoint);
        let endPoint = dictionary.length - startPoint;
        endPoint > amount ?  endPoint = startPoint + amount : endPoint = startPoint + endPoint
        //console.log("endpoint: " + endPoint);
        for (let i=startPoint; i<endPoint; i++) {
            //reducedDictionary.push(dictionary[i]);
            reducedDictionary = [...reducedDictionary, dictionary[i]];
        }
        this.setState({
            visibleDictionary: reducedDictionary
        })
        //console.log("reducedDictionary:");
        //console.log(reducedDictionary);
    }

    updateEntryDictionary(i, newLevel, newCorrectAnswer) {
        if (newLevel<=0) newLevel = 1;
        this.setState({
            dictionary: this.state.dictionary.map(item => {
                if (item.id === i) {
                    return {
                        id: item.id,
                        English: item[this.state.languageOne],
                        Spanish: item[this.state.languageTwo],
                        MemoryLevel: newLevel,
                        LastTestCorrectAnswer: newCorrectAnswer
                    };
                } else {
                    return item;
                }
            })
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
                            path="chooselanguages"
                            element={<ChooseLanguages 
                                languageOne={this.state.languageOne}
                                languageTwo={this.state.languageTwo}
                                arrLanguages={this.state.arrLanguages}
                                updateChosenLanguages={this.updateChosenLanguages}
                            />}
                        />
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
                                onChangeTypeFilter={this.changeTypeFilter}
                                onChangeFilter={this.updateFilter}
                                updateFilteredDictionary={this.updateFilteredDictionary}
                                visibleDictionary={this.state.visibleDictionary}
                                currentPage={this.state.currentPage}
                                maxPage={this.state.maxPage}
                                pageNumberDecrease={this.pageNumberDecrease}
                                pageNumberIncrease={this.pageNumberIncrease}
                                getMaxPage={this.getMaxPage}
                                adjustAmountItems={this.adjustAmountItems}
                                adjustVisibleDictionary={this.adjustVisibleDictionary}
                                lengthFilteredDictionary={this.state.lengthFilteredDictionary}
                            />}
                        />
                        <Route
                            path="test"
                            element={<Test
                                languageOne={this.state.languageOne}
                                languageTwo={this.state.languageTwo}
                                dictionary={this.state.dictionary}
                                updateEntryDictionary={this.updateEntryDictionary}
                            />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}
 
export default App;