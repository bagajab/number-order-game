import React from 'react'

const StartGame = ({ name, startGame }) => {
    return (
        <div className="d-flex vh-100">
            <div className="d-flex w-100 justify-content-center align-self-center">
                <form>
                    <div className="form-group">
                        <h3><b>Hi</b> <span className="text-primary">{name}</span>!</h3>
                    </div>
                    <div className="form-group text-center">
                        <button className="btn btn-info" onClick={startGame}>Start Game</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default StartGame
