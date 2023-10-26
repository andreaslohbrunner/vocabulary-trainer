import { Component } from "react";

class RowDictionarySimple extends Component {
    state = {  } 
    render() { 
        return (
            <tr>
                <th scope="row">{this.props.rowId}</th>
                <td>{this.props.rowLanguageOne}</td>
                <td>{this.props.rowLanguageTwo}</td>
            </tr>
        );
    }
}
 
export default RowDictionarySimple;