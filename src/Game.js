import React, { Component } from 'react'
import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db')
const db = low(adapter)


class Game extends Component {

    constructor(props) {
        super(props);
        this.state = { name: "", number: null, gameStarted: false, guess: null, guessHasError: false, trials: [] };
    }


    componentDidMount() {
        db.read();
        const name = db.get('name').value();
        const number = db.get('number').value();
        const gameStarted = db.get('gameStarted').value();
        const trials = db.get('trials').value();
        this.setState({ name, number, gameStarted, trials });
    }

    handleGuessInput = (event) => {
        this.setState({ guess: event.target.value, guessHasError: false });
    }

    validateGuess = () => {
        db.read();
        const { number, guess } = this.state;
        const { wonGame } = this.props;
        if (guess < 1000 || guess > 9999) return this.setState({ guessHasError: true });

        let formattedGuess = guess.toString().split('');
        let formattedNumber = number.toString().split('');

        let order = 0;
        let match = 0;
        formattedGuess.forEach((num, index) => {
            if (num === formattedNumber[index]) order += 1;
            if (formattedNumber.includes(num)) match += 1
        })
        const primaryKey = db.get('trials').value().length + 1;
        db.get('trials').push({ id: primaryKey, guess, match, order }).write();

        db.read();
        let trials = db.get('trials').value();
        this.setState({ trials });
        if (match === 4 && order === 4) wonGame();

    }



    render() {
        const { guessHasError, trials } = this.state;

        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-sm-12 col-md-4 col-lg-4 offset-md-4 offset-lg-4">
                        <div className="form-group">
                            <input className="form-control" placeholder="Enter your guess"
                                type="number" id="guess" max="9999" min="1000" onChange={this.handleGuessInput} />
                            {guessHasError && <span className="text-danger">Guess must be between 1000 and 9999.</span>}
                        </div>
                        <div className="form-group">
                            <button className="btn btn-info" onClick={this.validateGuess}>Guess</button>
                        </div>
                        <hr />
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Guess</th>
                                    <th scope="col">Match</th>
                                    <th scope="col">Order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trials.map(trial => {
                                    return (
                                        <tr key={trial.id}>
                                            <td>{trial.guess}</td>
                                            <td>{trial.match}</td>
                                            <td>{trial.order}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game;
