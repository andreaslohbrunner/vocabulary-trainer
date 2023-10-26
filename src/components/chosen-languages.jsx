import { Component } from "react";
import ReactCountryFlag from "react-country-flag";

class ChosenLanguages extends Component {
    state = {  } 
    render() { 
        return (
            <div className="container">
                <div className="row text-center mt-3">
                    <div className="col">
                        <h2>{this.props.languageOne} - {this.props.languageTwo}</h2>
                    </div>
                </div>
                <div className="row justify-content-center my-3 mx-2">
                    <div className="col-4" style={{maxWidth: '250px'}}>
                        <ReactCountryFlag
                            countryCode={this.props.countryCodeOne}
                            svg
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            title={this.props.countryCodeOne}
                        />
                    </div>
                    <div className="col-1"></div>
                    <div className="col-4" style={{maxWidth: '250px'}}>
                        <ReactCountryFlag
                            countryCode={this.props.countryCodeTwo}
                            svg
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            title={this.props.countryCodeTwo}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ChosenLanguages;