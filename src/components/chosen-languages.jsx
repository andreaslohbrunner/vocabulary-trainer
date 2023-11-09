import { Component } from "react";
import ReactCountryFlag from "react-country-flag";

class ChosenLanguages extends Component {
    state = {  } 
    render() { 
        return (
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card mt-3 mx-3 p-2 bg-light">
                        <div className="row justify-content-center">
                            <div className="col-3 text-center d-flex flex-column justify-content-center align-items-center m-1 py-3 bg-secondary-subtle rounded-4">
                                <h3 >{this.props.languageOne}</h3>
                                <h3 >{this.props.languageTwo}</h3>
                            </div>
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
                </div>
            </div>
        );
    }
}
 
export default ChosenLanguages;