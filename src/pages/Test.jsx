import { Component} from "react";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

import { Doughnut } from "react-chartjs-2";

import RowDictionaryTestedWords from "../components/content/row-dictionary-tested-words";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testDictionaryOrder: [],
            testDictionaryLength: 5,
            testVocabulary: {},
            wordsLeft: 5,
            testNumber: 0,
            testedWordsIds: [],
            testedWordsIdsTotal: [],
            result: 'Result',
            resultColor: 'bg-secondary',
            intervalSwitcher: '',
            displayCorrection: ' d-none',
            testedWords: 0,
            correctAnswers: 0,
            score: 0,
            totalTestedWords: 0,
            totalCorrectAnswers: 0,
            totalScore: 0,
            displayTest: '',
            displayEndscore: ' d-none',
            displayNoTestLeft: ' d-none',
            flagTotalEndScore: false
        }
        this.getTestDictionaryOrder=this.getTestDictionaryOrder.bind(this);
        this.getInitialWordsLeft=this.getInitialWordsLeft.bind(this);
        this.resetResult=this.resetResult.bind(this);
        this.resetInterval=this.resetInterval.bind(this);
        this.checkResult=this.checkResult.bind(this);
        this.getCorrectAnswer=this.getCorrectAnswer.bind(this);
        this.getWrongAnswer=this.getWrongAnswer.bind(this);
        this.getNewWord=this.getNewWord.bind(this);
        this.acceptCorrection=this.acceptCorrection.bind(this);
        this.showEndscore=this.showEndscore.bind(this);
        this.createNextTest=this.createNextTest.bind(this);
        this.reshuffleTestDictionaryOrder=this.reshuffleTestDictionaryOrder.bind(this);
    }

    componentDidMount() {
        this.getTestDictionaryOrder();
    }

    getTestDictionaryOrder() {
        console.log("dictionary:");
        console.log(this.props.dictionary);
        let copyDictionary = [...this.props.dictionary];
        const shuffledDictionary = copyDictionary.sort(() => 0.5 - Math.random());
        console.log("shuffled dictionary");
        console.log(shuffledDictionary);
        this.setState({
            testDictionaryOrder: shuffledDictionary,
            testVocabulary: shuffledDictionary[0],
            testNumber: 0
        })
        this.getInitialWordsLeft();
    }

    getInitialWordsLeft() {
        let newWordsLeft=0;
        if (this.state.testNumber+this.state.testDictionaryLength <= this.props.dictionary.length) {
            newWordsLeft=this.state.testDictionaryLength;
        } else {
            newWordsLeft=this.props.dictionary.length-this.state.testNumber;
        }
        this.setState({
            wordsLeft: newWordsLeft
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
        console.log(this.state.testVocabulary);
        if (answer.value === this.state.testVocabulary[this.props.countryCodeTwo]) {
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
            wordsLeft: this.state.wordsLeft - 1,
            testNumber: newTestNumber,
            testedWordsIds: [...this.state.testedWordsIds, this.state.testVocabulary.id],
            testedWordsIdsTotal: [...this.state.testedWordsIdsTotal, this.state.testVocabulary.id],
            result: 'Correct!',
            resultColor: 'bg-success',
            testedWords: newTestedWords,
            correctAnswers: newCorrectAnswers,
            score: Math.round((newCorrectAnswers / newTestedWords) * 100),
            totalTestedWords: this.state.totalTestedWords + 1,
            totalCorrectAnswers: this.state.totalCorrectAnswers + 1
        });
        this.props.updateEntryDictionary(
            this.state.testVocabulary.id,
            this.state.testVocabulary.MemoryLevel + 1,
            'yes'
        );
        if (this.state.wordsLeft - 1 > 0) {
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
            score: Math.round((this.state.correctAnswers / newTestedWords) * 100),
            totalTestedWords: this.state.totalTestedWords + 1
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
            wordsLeft: this.state.wordsLeft - 1,
            testNumber: newTestNumber,
            testedWordsIds: [...this.state.testedWordsIds, this.state.testVocabulary.id],
            testedWordsIdsTotal: [...this.state.testedWordsIdsTotal, this.state.testVocabulary.id],
            result: 'Result',
            resultColor: 'bg-secondary',
            displayCorrection: ' d-none'
        })
        this.props.updateEntryDictionary(
            this.state.testVocabulary.id,
            this.state.testVocabulary.MemoryLevel - 1,
            'no'
        );
        if (this.state.wordsLeft - 1 > 0) {
            this.getNewWord(newTestNumber);
        } else {
            this.showEndscore();
        }
    }

    showEndscore() {
        //console.log(this.props.dictionary);
        this.setState({
            displayTest: ' d-none',
            displayEndscore: ''
        })
    }

    showNoTestLeft() {
        this.setState({
            totalScore: Math.round((this.state.totalCorrectAnswers / this.state.totalTestedWords) * 100),
            flagTotalEndScore: true
        })
    }

    createNextTest() {
        if (this.state.testNumber === this.props.dictionary.length) {
            this.showNoTestLeft();
        } else {
            this.setState({
                testVocabulary: this.state.testDictionaryOrder[this.state.testNumber],
                testedWordsIds: [],
                result: 'Result',
                resultColor: 'bg-secondary',
                testedWords: 0,
                correctAnswers: 0,
                score: 0,
                displayTest: '',
                displayEndscore: ' d-none'
            })
            this.getInitialWordsLeft();
        }
    }

    reshuffleTestDictionaryOrder() {
        console.log("Reshuffle!");
        this.getTestDictionaryOrder();
        this.setState({
            testedWordsIds: [],
            testedWordsIdsTotal: [],
            result: 'Result',
            resultColor: 'bg-secondary',
            testedWords: 0,
            correctAnswers: 0,
            score: 0,
            totalTestedWords: 0,
            totalCorrectAnswers: 0,
            totalScore: 0,
            displayTest: '',
            displayEndscore: ' d-none'
        })
    }

    render() { 
        let wordsToRender=[];
        let amountCorrectAnswers=0;
        let amountTestedWords=0;
        let scoreToRender=0;
        let showElementsCurrentEndScore = '';
        let showElementsTotalEndScore = ' d-none';
        let titleTestedWords = 'Tested Words';
        if (this.state.flagTotalEndScore) {
            wordsToRender=[...this.state.testedWordsIdsTotal];
            amountCorrectAnswers=this.state.totalCorrectAnswers;
            amountTestedWords=this.state.totalTestedWords;
            scoreToRender=this.state.totalScore;
            showElementsCurrentEndScore = ' d-none';
            showElementsTotalEndScore = '';
            titleTestedWords = 'All tested Words today';
        } else {
            wordsToRender=[...this.state.testedWordsIds]
            amountCorrectAnswers=this.state.correctAnswers;
            amountTestedWords=this.state.testedWords;
            scoreToRender=this.state.score;
            showElementsCurrentEndScore = '';
            showElementsTotalEndScore = ' d-none';
            titleTestedWords = 'Tested Words';
        }

        const testedDictionary = wordsToRender.map(id => {
            let iconClass = '';
            switch (this.props.dictionary[id-1].LastTestCorrectAnswer) {
                case 'yes':
                    iconClass = 'fa-check';
                    break;
                case 'no':
                    iconClass = 'fa-xmark';
                    break;
                default:
                    iconClass = 'fa-question';
            }
            //console.log("debug");
            //console.log(this.props.dictionary[id-1]);
            return (
                <RowDictionaryTestedWords
                    rowId={id}
                    rowLanguageOne={this.props.dictionary[id-1][this.props.countryCodeOne]}
                    rowLanguageTwo={this.props.dictionary[id-1][this.props.countryCodeTwo]}
                    memoryLevel={this.props.dictionary[id-1].MemoryLevel}
                    correctAnswer={iconClass}
                    key={id}
                />
            )
        })
        
        const dataChartTestedWords = {
            labels: ['Correct', 'Not correct'],
            datasets: [{
                label: 'Your Score',
                data: [
                    amountCorrectAnswers,
                    amountTestedWords - amountCorrectAnswers
                ],
                backgroundColor: ['#14A44D', '#DC4C64'],
                borderColor: ['white', 'white']
            }]
        }

        const optionsChartTestedWords = {}

        const doughnutTextCenter = {
            id: 'textCenter',
            beforeDatasetsDraw(chart, args, pluginOptions) {
                const {ctx, data} = chart;

                const value = Math.round((data.datasets[0].data[0]/(data.datasets[0].data[0]+data.datasets[0].data[1]))*100);

                ctx.save();
                ctx.font = 'bolder 40px sans-serif';
                ctx.fillStyle = '#14A44D';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(value + '%', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
            }
        }

        return (
            <div className="test container">
                <div className="row justify-content-center my-5">
                    <div className="col-lg-6 mb-4">
                        <div className="card">
                            <div className="card-header">
                                <h3>Vocabulary Test</h3>
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
                                <h3 className="text-center mb-3">{this.state.testVocabulary[this.props.countryCodeOne]}</h3>
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
                                <div className="ms-3 mt-4 col-3">
                                    Words left: {this.state.wordsLeft}
                                </div>
                                <div className="text-center my-3 col-4">
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
                                            {' ' + this.state.testVocabulary[this.props.countryCodeTwo]}
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
                                <div className="col-8">
                                    <Doughnut
                                        data= {dataChartTestedWords}
                                        options={optionsChartTestedWords}
                                        plugins={[doughnutTextCenter]}
                                    ></Doughnut>
                                </div>
                                <div className={"col-4"}>
                                    <div className={"mb-5" + showElementsTotalEndScore}>
                                        No more vocabularies left to test! Great job!
                                        These are your final results:
                                    </div>
                                    <p className="text-center">
                                        You have <br/>
                                        <span className="fw-bold">
                                            {amountCorrectAnswers} out of {amountTestedWords} <br/>
                                        </span>
                                        correct!
                                    </p>
                                    <h5 className="mt-5 text-center">
                                        Your Score: <br/>
                                        <span className="fw-bold">
                                            {scoreToRender}%
                                        </span>
                                    </h5>
                                    <button
                                        type="submit"
                                        className={"btn btn-primary text-white mt-5"+ showElementsCurrentEndScore}
                                        onClick={this.createNextTest}
                                    >
                                        Go to next Test
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <h3>{titleTestedWords}</h3>
                            </div>
                            <table className={"table table-striped table-hover w-auto"}>
                                <thead>
                                    <tr>
                                        <th scope="col">{this.props.languageOne}</th>
                                        <th scope="col">{this.props.languageTwo}</th>
                                        <th scope="col">Level</th>
                                        <th scope="col">Correct Answer</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {testedDictionary}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Test;