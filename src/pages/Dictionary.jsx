import { Component } from "react";

import RowDictionaryAdvanced from "../components/content/row-dictionary-advanced";

class Dictionary extends Component {

    constructor(props) {
        super(props);
        this.filterDictionary=this.filterDictionary.bind(this);
    }

    filterDictionary() {
        let filteredDictionary = [];
        if(this.props.filter === '') {
            filteredDictionary = [...this.props.dictionary];
        } else {
            const regex = new RegExp(this.props.filter);
            for (let i=0; i<this.props.dictionary.length; i++) {
                if (regex.test(this.props.dictionary[i].English)) {
                    filteredDictionary.push(this.props.dictionary[i])
                }
            }
        }
        //console.log(filteredDictionary);
        /*this.setState({
            visibleDictionary: filteredDictionary
        })*/
        return filteredDictionary
    }

    render() {
        const filteredDictionary = this.filterDictionary();
        const tableDictionary = filteredDictionary.map(item => {
            return (
                <RowDictionaryAdvanced
                    rowId={item.id}
                    rowLanguageOne={item.English}
                    rowLanguageTwo={item.Spanish}
                    memoryLevel={item.MemoryLevel}
                    key={item.id}
                />
            )
        })
        return (
            <div className="dictionary container">
                <div className="row justify-content-center my-5">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h3>Vocabulary List</h3>
                            </div>
                            <div className="dictionary-options row mt-3 mx-2">
                                <div className="col-4">
                                    <button
                                        type="submit"
                                        className="btn w-100 btn-primary"
                                        onClick={this.props.onClickReduceLevel}
                                    >
                                        Reduce Level
                                    </button>
                                </div>
                                <div className="col-4">
                                    <button
                                        type="submit"
                                        className="btn w-100 btn-secondary"
                                        onClick={this.props.onClickResetLevel}
                                    >
                                        Reset Level
                                    </button>
                                </div>
                                <div className="col-4">
                                    <button
                                        type="submit"
                                        className="btn w-100 btn-danger"
                                        onClick={this.props.onClickDeleteVocabulary}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <hr />
                            <div className="mx-2 mb-2 row">
                                <div className="col-4">
                                    <select className="form-select" id="autoSizingSelect">
                                        <option selected>Choose...</option>
                                        <option value={this.props.languageOne}>{this.props.languageOne}</option>
                                        <option value={this.props.languageTwo}>{this.props.languageTwo}</option>
                                        <option value="Level">Level</option>
                                    </select>
                                </div>
                                <div className="col-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="textbox-filter"
                                        value={this.props.filter}
                                        onChange={this.props.onChangeFilter}
                                        placeholder='Search ...'
                                    />
                                </div>
                            </div>
                            <table className="table table-striped table-hover w-auto">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox" value=""
                                                    id="checkbox-all"
                                                />
                                                    <label className="form-check-label" htmlFor="flexCheckDefault" />
                                            </div>
                                        </th>
                                        <th scope="col">{this.props.languageOne}</th>
                                        <th scope="col">{this.props.languageTwo}</th>
                                        <th scope="col">Level</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {tableDictionary}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Dictionary;