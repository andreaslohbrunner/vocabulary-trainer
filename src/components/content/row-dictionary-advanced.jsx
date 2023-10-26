import { Component } from "react";

class RowDictionaryAdvanced extends Component {
    state = {  } 
    render() { 
        return (
            <tr>
                <th scope="row">{this.props.rowId}</th>
                <td>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox" value=""
                            id={"checkbox-" + this.props.rowId}
                        />
                            <label className="form-check-label" htmlFor={"checkbox-" + this.props.rowId} />
                    </div>
                </td>
                <td>{this.props.rowLanguageOne}</td>
                <td>{this.props.rowLanguageTwo}</td>
                <td>{this.props.memoryLevel}</td>
            </tr>
        );
    }
}
 
export default RowDictionaryAdvanced;