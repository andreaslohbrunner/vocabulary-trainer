import { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-primary fixed-top" data-bs-theme="dark">
                    <div className="container-fluid">
                        <NavLink
                            to='/vocabulary-trainer'
                            className="navbar-brand"
                            href="#"
                        >
                            Vocabulary Trainer
                        </NavLink>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <NavLink
                                    to='/vocabulary-trainer'
                                    className="nav-link active"
                                    aria-current="page"
                                    href="#"
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    to='choose-languages'
                                    className="nav-link"
                                    href="#"
                                >
                                    Choose Languages
                                </NavLink>
                                <NavLink
                                    to='add-vocabulary'
                                    className="nav-link"
                                    href="#"
                                >
                                    Add Vocabulary
                                </NavLink>
                                <NavLink
                                    to='dictionary'
                                    className="nav-link"
                                    href="#"
                                >
                                    Dictionary
                                </NavLink>
                                <NavLink
                                    to='test'
                                    className="nav-link"
                                    href="#"
                                >
                                    Test
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
 
export default NavBar;