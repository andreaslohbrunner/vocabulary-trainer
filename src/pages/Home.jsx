import { Component } from "react";

import { textsForCardLinks } from "../components/content/text-for-card-links";
import CardLinks from "../components/card-links";

class Home extends Component {
    state = {  } 
    render() { 
        const cardsLinks = textsForCardLinks.map(card => {
            return (
                <CardLinks
                    id={card.id}
                    header={card.header}
                    description={card.description}
                    image={card.image}
                    link={card.link}
                    key={card.id}
                />
            )
        })
        return (
            <div className="home mx-5">
                <div className="row justify-content-center my-5">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h3>Home</h3>
                            </div>
                            <div className="card-body">
                                Please choose, what you want to do:
                                <hr />
                                <div className="d-flex justify-content-evenly flex-wrap">
                                    {cardsLinks}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Home;