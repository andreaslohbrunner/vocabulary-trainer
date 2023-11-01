import { Component} from "react";

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testDictionaryOrder: [],
            testDictionaryLength: 5,
            testVocabulary: {},
            numberTests: 1,
            testNumber: 0,
            result: 'Result',
            resultColor: 'bg-secondary',
            intervalSwitcher: '',
            displayCorrection: ' d-none',
            testedWords: 0,
            correctAnswers: 0,
            score: 0,
            displayTest: '',
            displayEndscore: ' d-none'
        }
        this.getTestDictionaryOrder=this.getTestDictionaryOrder.bind(this);
        this.resetResult=this.resetResult.bind(this);
        this.resetInterval=this.resetInterval.bind(this);
        this.checkResult=this.checkResult.bind(this);
        this.getCorrectAnswer=this.getCorrectAnswer.bind(this);
        this.getWrongAnswer=this.getWrongAnswer.bind(this);
        this.getNewWord=this.getNewWord.bind(this);
        this.acceptCorrection=this.acceptCorrection.bind(this);
        this.showEndscore=this.showEndscore.bind(this);
        this.createNextTest=this.createNextTest.bind(this);
    }

    componentDidMount() {
        this.getTestDictionaryOrder();
    }

    getTestDictionaryOrder() {
        let copyDictionary = [...this.props.dictionary];
        const shuffledDictionary = copyDictionary.sort(() => 0.5 - Math.random());
        console.log(shuffledDictionary);
        this.setState({
            testDictionaryOrder: shuffledDictionary,
            testVocabulary: shuffledDictionary[this.state.testNumber],
        })
    }

    resetResult(result=this.state.result) {
        if (result !== 'Result') {
            this.setState({
                intervalSwitcher: setInterval(() => {
                    this.setState({
                        result: 'Result',
                        resultColor: 'bg-secondary'
                    });
                }, 2000)
            });
        }
    }

    resetInterval() {
        clearInterval(this.state.intervalSwitcher);
        this.setState({
            intervalSwitcher: ''
        });
    }

    checkResult() {
        this.resetInterval();
        let answer=document.getElementById("test-answer")
        console.log(answer.value);
        if (answer.value === this.state.testVocabulary[this.props.languageTwo]) {
            this.getCorrectAnswer();
            answer.value='';
        } else {
            this.getWrongAnswer();
        }
    }

    getCorrectAnswer() {
        let newTestNumber = this.state.testNumber + 1;
        let newTestedWords = this.state.testedWords + 1;
        let newCorrectAnswers = this.state.correctAnswers + 1;
        this.setState({
            testNumber: newTestNumber,
            result: 'Correct!',
            resultColor: 'bg-success',
            testedWords: newTestedWords,
            correctAnswers: newCorrectAnswers,
            score: Math.round((newCorrectAnswers / newTestedWords) * 100)
        });
        if (newTestNumber < this.state.testDictionaryLength * this.state.numberTests) {
            this.getNewWord(newTestNumber);
            this.resetResult('Correct!');
        } else {
            this.showEndscore();
        }
    }

    getWrongAnswer() {
        let newTestedWords = this.state.testedWords + 1;
        let button = document.getElementById("check-result");
        button.disabled = true;
        this.setState({
            result: 'Not correct',
            resultColor: 'bg-danger',
            displayCorrection: '',
            testedWords: newTestedWords,
            correctAnswers: this.state.correctAnswers,
            score: Math.round((this.state.correctAnswers / newTestedWords) * 100)
        })
    }

    getNewWord(i) {
        this.setState({
            testVocabulary: this.state.testDictionaryOrder[i]
        })
    }

    acceptCorrection() {
        let newTestNumber = this.state.testNumber + 1;
        let answer=document.getElementById("test-answer");
        let button = document.getElementById("check-result");
        answer.value='';
        button.disabled = false;
        this.setState({
            testNumber: newTestNumber,
            result: 'Result',
            resultColor: 'bg-secondary',
            displayCorrection: ' d-none'
        })
        if (newTestNumber < this.state.testDictionaryLength * this.state.numberTests) {
            this.getNewWord(newTestNumber);
        } else {
            this.showEndscore();
        }
    }

    showEndscore() {
        this.setState({
            displayTest: ' d-none',
            displayEndscore: ''
        })
    }

    createNextTest() {
        this.setState({
            testVocabulary: this.state.testDictionaryOrder[this.state.testNumber],
            numberTests: this.state.numberTests + 1,
            result: 'Result',
            resultColor: 'bg-secondary',
            testedWords: 0,
            correctAnswers: 0,
            score: 0,
            displayTest: '',
            displayEndscore: ' d-none'
        })
    }

    render() { 
        return (
            <div className="test container">
                <div className="row justify-content-center my-5">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h3>Vocabulary Test</h3>
                            </div>
                            <div className={"test-options row mt-3 mx-2" + this.state.displayTest}>

                            </div>
                            <table className={"table table-striped table-hover w-auto" + this.state.displayTest}>
                                <thead>
                                    <tr>
                                        <th scope="col">Tested Words</th>
                                        <th scope="col">Correct Answers</th>
                                        <th scope="col">Score</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    <tr>
                                        <td className="text-center">{this.state.testedWords}</td>
                                        <td className="text-center">{this.state.correctAnswers}</td>
                                        <td className="text-center">{this.state.score}%</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className={"test-question row mt-3 mx-2" + this.state.displayTest}>
                                <h5 className="mb-4 text-center">Please translate into {this.props.languageTwo}:</h5>
                                <h3 className="text-center mb-3">{this.state.testVocabulary[this.props.languageOne]}</h3>
                                <div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="test-answer"
                                        placeholder='Enter your word here ...'
                                    />
                                </div>
                            </div>
                            <div className={"row" + this.state.displayTest}>
                                <div className="text-center my-3 col-7">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={this.checkResult}
                                        id="check-result"
                                    >
                                        Check Result
                                    </button>
                                </div>
                                <div className={'text-center my-3 col-4 rounded-pill text-white ' + this.state.resultColor}>
                                    <h3 className="mt-1">{this.state.result}</h3>
                                </div>
                            </div>
                            <div className={"row mb-2 bg-info-subtle mx-3 py-2 rounded" + this.state.displayCorrection}>
                                <div className="text-center col-7 mt-2">
                                    <i>Correct Answer: 
                                        <i className="fw-bold">
                                            {' ' + this.state.testVocabulary[this.props.languageTwo]}
                                        </i>
                                    </i>
                                </div>
                                <div className="col-3"></div>
                                <div className="text-center col-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary text-white w-100"
                                        onClick={this.acceptCorrection}
                                    >
                                        Ok
                                    </button>
                                </div>
                            </div>
                            <div className={"row m-3" + this.state.displayEndscore}>
                                <div className="col-7">
                                    You have {this.state.correctAnswers} out of {this.state.testedWords} correct!
                                </div>
                                <div className="col-5">
                                    <button
                                        type="submit"
                                        className="btn btn-primary text-white"
                                        onClick={this.createNextTest}
                                    >
                                        Go to next Test
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Test;