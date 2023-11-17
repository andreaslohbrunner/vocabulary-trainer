import { Component } from "react";
import { Link } from "react-router-dom";

class CardLinks extends Component {
    state = {  } 
    render() { 
        return (
            <div
                className='m-2'
                style={{maxWidth: '280px'}}
                id="Home-1"
            >
                <div className="card-header bg-secondary-subtle d-flex fw-semibold">
                    {this.props.header}
                </div>
                <div className="card-body bg-body-tertiary p-3">
                    <p>
                        {this.props.description}
                    </p>
                    <Link
                        className="button-home btn btn-primary text-center mx-2"
                        to={this.props.link}
                    >
                        Go to
                    </Link>
                </div>
                <img src={require('./img/' + this.props.image + '.PNG')} className="card-img-bottom" alt={this.props.image} />
            </div>
        );
    }
}
 
export default CardLinks;