import { Component } from "react";
import React from "react";
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
            databaseDictionaries: [
                [
                    {
                        languageOne: 'English (US)',
                        languageTwo: 'Spanish',
                        countryCodeOne: 'US',
                        countryCodeTwo: 'ES'
                    },
                    {
                        dictionary: listEnglishSpanish
                    }
                ]
            ],
            languageOne: 'English (US)',
            languageTwo: 'Spanish',
            countryCodeOne: 'US',
            countryCodeTwo: 'ES',
            arrLanguages: listLanguages,
            dictionary: listEnglishSpanish,
            filter: '',
            typeFilter: 'US',
            filteredDictionary: listEnglishSpanish,
            visibleDictionary: listEnglishSpanish,
            currentPage: 1,
            maxPage: 1,
            amountItems: 10,
            lengthFilteredDictionary: listEnglishSpanish.length
        }
        this.getDictionary=this.getDictionary.bind(this);
        this.switchLanguages=this.switchLanguages.bind(this);
        this.test=React.createRef();
        this.updateChosenLanguages=this.updateChosenLanguages.bind(this);
        this.createNewDictionary=this.createNewDictionary.bind(this);
        this.updateDictionaryDatabase=this.updateDictionaryDatabase.bind(this);
        this.saveVocabulary = this.saveVocabulary.bind(this);
        this.adjustLevel = this.adjustLevel.bind(this);
        this.deleteVocabulary = this.deleteVocabulary.bind(this);
        this.renumberDictionary = this.renumberDictionary.bind(this);
        this.changeTypeFilter=this.changeTypeFilter.bind(this);
        this.resetTypeFilter=this.resetTypeFilter.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.resetFilter=this.resetFilter.bind(this);
        this.updateFilteredDictionary=this.updateFilteredDictionary.bind(this);
        this.pageNumberDecrease=this.pageNumberDecrease.bind(this);
        this.pageNumberIncrease=this.pageNumberIncrease.bind(this);
        this.getMaxPage=this.getMaxPage.bind(this);
        this.adjustAmountItems=this.adjustAmountItems.bind(this);
        this.adjustVisibleDictionary=this.adjustVisibleDictionary.bind(this);
        this.updateEntryDictionary=this.updateEntryDictionary.bind(this);
    }

    getDictionary(newCountryCodeOne = this.state.countryCodeOne, newCountryCodeTwo = this.state.countryCodeTwo) {
        let arrDictionary = this.state.databaseDictionaries.filter(dictionary => {
            //console.log(newCountryCodeOne === dictionary[0].countryCodeOne);
            if ((newCountryCodeOne === dictionary[0].countryCodeOne)
            || (newCountryCodeOne === dictionary[0].countryCodeTwo)) {
                if ((newCountryCodeTwo === dictionary[0].countryCodeTwo)
                || (newCountryCodeTwo === dictionary[0].countryCodeOne)) {
                    return dictionary;
                }
            } return false
        })

        let newDictionary = [...arrDictionary[0][1].dictionary];

        this.setState({
            dictionary: newDictionary
        })
        console.log(newDictionary);
    }

    switchLanguages() {
        this.setState({
            languageOne: this.state.languageTwo,
            languageTwo: this.state.languageOne,
            countryCodeOne: this.state.countryCodeTwo,
            countryCodeTwo: this.state.countryCodeOne
        })
        let completeUrl = window.location.href;
        let pathUrl = completeUrl.slice(-4);
        if (pathUrl === 'test') this.test.current.reshuffleTestDictionaryOrder();
    }

    updateChosenLanguages(objectLanguageOne, objectLanguageTwo) {
        this.setState({
            languageOne: objectLanguageOne.language,
            languageTwo: objectLanguageTwo.language,
            countryCodeOne: objectLanguageOne.countryCode,
            countryCodeTwo: objectLanguageTwo.countryCode
        })
    }

    createNewDictionary(objectLanguageOne, objectLanguageTwo) {
        console.log("input for creating new cardDictionary:")
        console.log(objectLanguageOne);
        console.log(objectLanguageTwo);
        let newDictionary = [
            {
                languageOne: objectLanguageOne.language,
                languageTwo: objectLanguageTwo.language,
                countryCodeOne: objectLanguageOne.countryCode,
                countryCodeTwo: objectLanguageTwo.countryCode
            },
            {
                dictionary: []
            }
        ]
        console.log("new cardDictionary (created)")
        console.log(newDictionary);
        this.setState({
            databaseDictionaries: [...this.state.databaseDictionaries, newDictionary],
            dictionary: []
        })
    }

    updateDictionaryDatabase(newDictionary) {
        /*console.log("newDictionary (updated):");
        console.log(newDictionary);
        console.log("old database:");
        console.log(this.state.databaseDictionaries);*/
        let newDatabaseDictionaries = this.state.databaseDictionaries.map(cardDictionary => {
            //console.log(cardDictionary);
            if (cardDictionary[0].countryCodeOne === this.state.countryCodeOne) {
                if (cardDictionary[0].countryCodeTwo === this.state.countryCodeTwo) {
                    return (
                        [
                            {
                                languageOne: cardDictionary[0].languageOne,
                                languageTwo: cardDictionary[0].languageTwo,
                                countryCodeOne: cardDictionary[0].countryCodeOne,
                                countryCodeTwo: cardDictionary[0].countryCodeTwo
                            },
                            {
                                dictionary: newDictionary
                            }
                        ]
                    )
                } return cardDictionary;
            } return cardDictionary;
        });
        //console.log("new database:");
        //console.log(newDatabaseDictionaries);
        this.setState({
            databaseDictionaries: newDatabaseDictionaries
        });
    }

    saveVocabulary() {
        let maxId = 0;
        if (this.state.dictionary.length > 0) {
            maxId = this.state.dictionary[this.state.dictionary.length-1].id;
        }
        let inputLanguageOne = document.getElementById('input-language-one');
        let inputLanguageTwo = document.getElementById('input-language-two');
        let newDictionary = [
            ...this.state.dictionary,
            {
                id: maxId + 1,
                [this.state.countryCodeOne]: inputLanguageOne.value,
                [this.state.countryCodeTwo]: inputLanguageTwo.value,
                MemoryLevel: 1
            }
        ]
        this.setState({
            dictionary: newDictionary,
            filter: ''
        })
        this.updateDictionaryDatabase(newDictionary);
        this.updateFilteredDictionary('', 1, newDictionary);
    }

    adjustLevel(event) {
        console.log(event.target.value);
        let updatedDictionary = this.state.dictionary.map(vocabulary => {
            let checkBox = document.getElementById("checkbox-" + vocabulary.id);
            if (checkBox) {
                if (checkBox.checked && vocabulary.MemoryLevel > 1) {
                    if (event.target.value === 'reduce') {
                        return {
                            ...vocabulary,
                            MemoryLevel: vocabulary.MemoryLevel - 1
                        }
                    } else {
                        return {
                            ...vocabulary,
                            MemoryLevel: 1
                        }
                    }
                } else {
                    return vocabulary;
                }
            } else {
                return vocabulary;
            }
        })
        this.updateFilteredDictionary(this.state.filter, this.state.currentPage, updatedDictionary, false);
        this.setState({
            dictionary: updatedDictionary
        })
        this.updateDictionaryDatabase(updatedDictionary);
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
        this.updateFilteredDictionary(this.state.filter, this.state.currentPage, renumberedDictionary, false);
        this.setState({
            dictionary: renumberedDictionary
        })
        this.updateDictionaryDatabase(renumberedDictionary);
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

    resetTypeFilter() {
        this.setState({
            typeFilter: this.state.countryCodeOne
        })
    }

    updateFilter(event) {
        this.setState({
            filter: event.target.value
        })
        this.updateFilteredDictionary(event.target.value, 1);
        //console.log(event.target.value);
    }

    resetFilter() {
        this.setState({
            filter: ''
        })
    }

    updateFilteredDictionary(expression='', page=this.state.currentPage, dictionary=this.state.dictionary, resetCurrentPage=true) {
        /*console.log("expression:");
        console.log(expression);
        console.log("currentPage:");
        console.log(page);
        console.log("input dictionary to filter function:");
        console.log(dictionary);*/
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
        if (resetCurrentPage) {
            this.setState({
                filteredDictionary: newDictionary,
                currentPage: 1
            })
        } else {
            this.setState({
                filteredDictionary: newDictionary
            })
        }
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
        //console.log("currentPage: " + this.state.currentPage);
        //console.log("maxPage: " + this.state.maxPage);
        if (this.state.currentPage < this.state.maxPage) {
            newCurrentPage = this.state.currentPage+1;
            this.setState({
                currentPage: newCurrentPage
            })
            this.adjustVisibleDictionary(newCurrentPage);
        }
    }

    getMaxPage(amount=this.state.amountItems, dictionary=this.state.filteredDictionary) {
        let amountVocabularies = 1;
        if (dictionary.length > 0) amountVocabularies = dictionary.length;
        this.setState({
            maxPage: Math.ceil(amountVocabularies/amount),
            lengthFilteredDictionary: dictionary.length
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
        let newDictionary = this.state.dictionary.map(vocabulary => {
            if (vocabulary.id === i) {
                return {
                    id: vocabulary.id,
                    [this.state.countryCodeOne]: vocabulary[this.state.countryCodeOne],
                    [this.state.countryCodeTwo]: vocabulary[this.state.countryCodeTwo],
                    MemoryLevel: newLevel,
                    LastTestCorrectAnswer: newCorrectAnswer
                };
            } else {
                return vocabulary;
            }
        })
        this.setState({
            dictionary: newDictionary
        })
        this.updateDictionaryDatabase(newDictionary);
    }

    render() { 
        return (
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/vocabulary-trainer"
                        element={<SharedLayout
                            languageOne={this.state.languageOne}
                            languageTwo={this.state.languageTwo}
                            countryCodeOne={this.state.countryCodeOne}
                            countryCodeTwo={this.state.countryCodeTwo}
                            switchLanguages={this.switchLanguages}
                        />}
                    >
                        <Route index element={<Home />} />
                        <Route
                            path="choose-languages"
                            element={<ChooseLanguages 
                                databaseDictionaries={this.state.databaseDictionaries}
                                languageOne={this.state.languageOne}
                                languageTwo={this.state.languageTwo}
                                arrLanguages={this.state.arrLanguages}
                                getDictionary={this.getDictionary}
                                updateChosenLanguages={this.updateChosenLanguages}
                                createNewDictionary={this.createNewDictionary}
                            />}
                        />
                        <Route
                            path="add-vocabulary"
                            element={<AddVocabulary 
                                languageOne={this.state.languageOne}
                                languageTwo={this.state.languageTwo}
                                countryCodeOne={this.state.countryCodeOne}
                                countryCodeTwo={this.state.countryCodeTwo}
                                dictionary={this.state.dictionary}
                                filteredDictionary={this.state.filteredDictionary}
                                updateFilteredDictionary={this.updateFilteredDictionary}
                                getDictionary={this.getDictionary}
                                saveVocabulary={this.saveVocabulary}
                                onChangeFilter={this.updateFilter}
                                resetTypeFilter={this.resetTypeFilter}
                                resetFilter={this.resetFilter}
                            />}
                        />
                        <Route
                            path="dictionary"
                            element={<Dictionary
                                languageOne={this.state.languageOne}
                                languageTwo={this.state.languageTwo}
                                countryCodeOne={this.state.countryCodeOne}
                                countryCodeTwo={this.state.countryCodeTwo}
                                dictionary={this.state.dictionary}
                                getDictionary={this.getDictionary}
                                onClickAdjustLevel={this.adjustLevel}
                                onClickResetLevel={this.resetLevel}
                                onClickDeleteVocabulary={this.deleteVocabulary}
                                filter={this.state.filter}
                                onChangeTypeFilter={this.changeTypeFilter}
                                onChangeFilter={this.updateFilter}
                                resetFilter={this.resetFilter}
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
                                countryCodeOne={this.state.countryCodeOne}
                                countryCodeTwo={this.state.countryCodeTwo}
                                dictionary={this.state.dictionary}
                                updateEntryDictionary={this.updateEntryDictionary}
                                ref={this.test}
                            />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}
 
export default App;