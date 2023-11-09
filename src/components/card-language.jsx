import { Component } from "react";
import ReactCountryFlag from "react-country-flag";

class CardLanguage extends Component {
    state = {  } 
    render() { 
        return (
            <div
                className={this.props.baseStyleCardLanguage}
                style={{maxWidth: '170px'}}
                id={"language-card-" + this.props.cardId}
            >
                <div className="card-header bg-secondary-subtle d-flex">
                    <div className={"form-check" + this.props.showSelectOptions}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value={this.props.cardId}
                            onClick={this.props.chooseLanguage}
                            id={"checkbox-" + this.props.cardId}
                        />
                        <label className="form-check-label" htmlFor={"checkbox-" + this.props.cardId} />
                    </div>
                    <h5>{this.props.languageTitle}</h5>
                </div>
                <div className="card-body bg-body-tertiary p-3">
                    <ReactCountryFlag
                        countryCode={this.props.countryCode}
                        svg
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        title={this.props.countryCode}
                    />
                </div>
            </div>
        );
    }
}
 
export default CardLanguage;