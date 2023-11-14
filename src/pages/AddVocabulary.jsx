import { Component } from "react";

import AddVocabularyContent from "../components/content/add-vocabulary";

class AddVocabulary extends Component {
    state = {  } 
    render() { 
        return (
            <section className='section'>
                <AddVocabularyContent
                    languageOne={this.props.languageOne}
                    languageTwo={this.props.languageTwo}
                    countryCodeOne={this.props.countryCodeOne}
                    countryCodeTwo={this.props.countryCodeTwo}
                    dictionary={this.props.dictionary}
                    saveVocabulary={this.props.saveVocabulary}
                />
            </section>
        );
    }
}
 
export default AddVocabulary;