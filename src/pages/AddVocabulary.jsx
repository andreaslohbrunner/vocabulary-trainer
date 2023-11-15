import { Component } from "react";
import RowDictionarySimple from "../components/content/row-dictionary-simple";

class AddVocabulary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueInputOne: '',
            valueInputTwo: ''
        }
        this.clearInput = this.clearInput.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    componentDidMount() {
        this.props.resetTypeFilter();
        this.props.resetFilter();
        this.props.updateFilteredDictionary('', 1);
    }

    clearInput() {
        this.setState({
            valueInputOne: '',
            valueInputTwo: ''
        })
    }

    handleInput() {
        this.props.saveVocabulary();
        this.clearInput();
    }

    updateValue(e) {
        let inputValue = '';
        e.target.id === "input-language-one"
            ? inputValue = 'valueInputOne'
            : inputValue = 'valueInputTwo';
        this.setState({
            [inputValue]: e.target.value
        })
        if (inputValue === 'valueInputOne') this.props.onChangeFilter(e);
    }

    render() { 
        const tableDictionary = this.props.filteredDictionary.map(vocabulary => {
            return (
                <RowDictionarySimple
                    rowId={vocabulary.id}
                    rowLanguageOne={vocabulary[this.props.countryCodeOne]}
                    rowLanguageTwo={vocabulary[this.props.countryCodeTwo]}
                    key={vocabulary.id}
                />
            )
        })
        return (
            <div className="add-vocabulary container">
                <div className="row justify-content-center my-5">
                    <div className="col-lg-6">
                        <div className="card mb-3">
                            <div className="card-header">
                                <h3>Add Vocabulary</h3>
                            </div>
                            <div className="mx-3">
                                <label htmlFor="input-language-one" className="form-label mt-3">{this.props.languageOne}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="input-language-one"
                                    value={this.state.valueInputOne}
                                    onChange={this.updateValue}
                                    placeholder='Enter your word here ...'
                                />
                            </div>
                            <div className="mx-3">
                                <label htmlFor="input-language-two" className="form-label mt-3">{this.props.languageTwo}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="input-language-two"
                                    value={this.state.valueInputTwo}
                                    onChange={this.updateValue}
                                    placeholder='Enter your word here ...'
                                />
                            </div>
                            <div className="text-center my-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={this.handleInput}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <h3>Vocabulary List</h3>
                            </div>
                            <table className="table table-striped table-hover w-auto">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">{this.props.languageOne}</th>
                                        <th scope="col">{this.props.languageTwo}</th>
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
 
export default AddVocabulary;