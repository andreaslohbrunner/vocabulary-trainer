import { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Vocabulary Trainer</a>
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
                                <NavLink to='/' className="nav-link active" aria-current="page" href="#">Home</NavLink>
                                <NavLink to='/' className="nav-link" href="#">Choose Languages</NavLink>
                                <NavLink to='/addvocabulary' className="nav-link" href="#">Add Vocabulary</NavLink>
                                <NavLink to='/dictionary' className="nav-link" href="#">Dictionary</NavLink>
                                <NavLink to='/' className="nav-link disabled" aria-disabled="true">Test</NavLink>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
 
export default NavBar;