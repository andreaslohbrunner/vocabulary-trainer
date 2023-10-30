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
            filter: '',
            filteredDictionary: listEnglishSpanish,
            visibleDictionary: listEnglishSpanish,
            currentPage: 1,
            maxPage: 1,
            amountItems: 10
        }
        this.saveVocabulary = this.saveVocabulary.bind(this);
        this.reduceLevel = this.reduceLevel.bind(this);
        this.resetLevel = this.resetLevel.bind(this);
        this.deleteVocabulary = this.deleteVocabulary.bind(this);
        this.renumberDictionary = this.renumberDictionary.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.updateFilteredDictionary=this.updateFilteredDictionary.bind(this);
        this.pageNumberDecrease=this.pageNumberDecrease.bind(this);
        this.pageNumberIncrease=this.pageNumberIncrease.bind(this);
        this.getMaxPage=this.getMaxPage.bind(this);
        this.adjustAmountItems=this.adjustAmountItems.bind(this);
        this.adjustVisibleDictionary=this.adjustVisibleDictionary.bind(this);
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
        let updatedDictionary = [...this.state.visibleDictionary];
        //console.log(updatedDictionary);
        //console.log(this.state.visibleDictionary);
        for (let i=0; i<updatedDictionary.length; i++) {
            let checkBox = document.getElementById("checkbox-" + updatedDictionary[i].id);
            //console.log(updatedDictionary[i].id);
            //console.log(checkBox);
            if (checkBox.checked) {
                if (updatedDictionary[i].MemoryLevel>1) {
                    updatedDictionary[i].MemoryLevel--;
                }
            }
        }
        this.setState({
            visibleDictionary: updatedDictionary
        })
    }

    resetLevel() {
        let updatedDictionary = [...this.state.visibleDictionary];
        for (let i=0; i<updatedDictionary.length; i++) {
            let checkBox = document.getElementById("checkbox-" + updatedDictionary[i].id);
            if (checkBox.checked) {
                updatedDictionary[i].MemoryLevel=1;
            }
        }
        this.setState({
            visibleDictionary: updatedDictionary
        })
    }

    deleteVocabulary() {
        let updatedDictionary = [];
        for (let i=1; i<=this.state.dictionary.length; i++) {
            let checkBox = document.getElementById("checkbox-" + i);
            if (checkBox) {
                //console.log(checkBox);
                if (!checkBox.checked) {
                    updatedDictionary.push(this.state.dictionary[i-1]);
                } else {
                    checkBox.checked = false;
                }
            } else {
                updatedDictionary.push(this.state.dictionary[i-1]);
            }
        }
        let renumberedDictionary = this.renumberDictionary(updatedDictionary);
        this.updateVisibleDictionary(this.state.filter, renumberedDictionary);
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
        this.updateFilteredDictionary(event.target.value);
    }

    updateFilteredDictionary(expression, dictionary=this.state.dictionary) {
        let newDictionary = [];
        if(expression === '') {
            newDictionary = [...dictionary];
        } else {
            const regex = new RegExp(expression);
            for (let i=0; i<dictionary.length; i++) {
                if (regex.test(dictionary[i].English)) {
                    newDictionary.push(dictionary[i])
                }
            }
        };
        this.setState({
            filteredDictionary: newDictionary,
            currentPage: 1
        })
        this.adjustVisibleDictionary(1, this.state.amountItems, newDictionary);
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
            maxPage: Math.ceil(amountVocabularies/amount)
        })
    }

    adjustAmountItems(event) {
        let amount = 0;
        if (event.target.value==="all") {
            amount = this.state.filteredDictionary.length;
            this.setState({
                currentPage: 1,
                amountItems: amount
            })
        } else {
            amount = event.target.value;
            this.setState({
                currentPage: 1,
                amountItems: amount
            })
        }
        this.adjustVisibleDictionary(1, amount);
        this.getMaxPage(amount);
    }

    adjustVisibleDictionary(page=this.state.currentPage, amount=this.state.amountItems, dictionary=this.state.filteredDictionary) {
        let reducedDictionary = [];
        //console.log(page);
        let startPoint = (page-1)*this.state.amountItems;
        //console.log("startpoint: " + startPoint);
        let endPoint = dictionary.length - startPoint;
        endPoint > amount ?  endPoint = startPoint + amount : endPoint = startPoint + endPoint
        //console.log("endpoint: " + endPoint);
        for (let i=startPoint; i<endPoint; i++) {
            reducedDictionary.push(dictionary[i]);
        }
        this.setState({
            visibleDictionary: reducedDictionary
        })
        //console.log(reducedDictionary);
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
                                currentPage={this.state.currentPage}
                                maxPage={this.state.maxPage}
                                pageNumberDecrease={this.pageNumberDecrease}
                                pageNumberIncrease={this.pageNumberIncrease}
                                getMaxPage={this.getMaxPage}
                                adjustAmountItems={this.adjustAmountItems}
                                adjustVisibleDictionary={this.adjustVisibleDictionary}
                            />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}
 
export default App;