import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";
import ChosenLanguages from "../components/chosen-languages";

const SharedLayout = () => {
    return (
        <>
            <NavBar />

            <ChosenLanguages
                languageOne={this.props.languageOne}
                languageTwo={this.props.languageTwo}
                countryCodeOne={this.props.countryCodeOne}
                countryCodeTwo={this.props.countryCodeTwo}
            />

            <Outlet />
        </>
    )
}

export default SharedLayout;