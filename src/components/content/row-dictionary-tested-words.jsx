import { Component } from "react";

class RowDictionaryTestedWords extends Component {
    state = {  } 
    render() { 
        return (
            <tr>
                <td className="text-center">{this.props.rowLanguageOne}</td>
                <td className="text-center">{this.props.rowLanguageTwo}</td>
                <td className="text-center">{this.props.memoryLevel}</td>
                <td className="text-center">
                    <i className={"fa-solid " + this.props.correctAnswer}></i>
                </td>
            </tr>
        );
    }
}
 
export default RowDictionaryTestedWords;