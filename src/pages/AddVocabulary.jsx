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
                    dictionary={this.props.dictionary}
                    saveVocabulary={this.props.saveVocabulary}
                />
            </section>
        );
    }
}
 
export default AddVocabulary;