import React, { Component } from 'react'
import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db')
const db = low(adapter)

class SuccessMessage extends Component {
    render() {
        db.read();
        let trials = db.get('trials').value();
        const { startGame } = this.props;
        return (
            <div className="d-flex vh-100">
                <div className="d-flex w-100 justify-content-center align-self-center">
                    <div className="container">
                        <div className="row mt-4">
                            <div className="col-sm-12 col-md-6 col-lg-6 offset-md-3 offset-lg-3">
                                <div class="alert alert-success" role="alert">
                                    <h4 class="alert-heading">Well done!</h4>
                                    <ul>
                                        <li>Success sits on a mountain of mistakes.</li>
                                        <li>Failure is an opportunity to learn again.</li>
                                    </ul>
                                    <hr />
                                    <div className="text-center">
                                        <p><b>You won in {trials.length} trials.</b></p>
                                        <button className="btn btn-primary" onClick={e => startGame()}>Play Again</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SuccessMessage
