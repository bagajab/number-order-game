import React, { Component } from 'react'
import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import EnterName from './EnterName'
import StartGame from './StartGame'
import Game from './Game'
import _ from 'lodash';
import SuccessMessage from './SuccessMessage'


const adapter = new LocalStorage('db')
const db = low(adapter)

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { name: "", number: null, gameStarted: false, wonGame: false};
  }


  componentDidMount() {
    const name = db.get('name').value();
    const number = db.get('number').value();
    const wonGame = db.get('wonGame').value();
    const gameStarted = db.get('gameStarted').value();
    this.setState({ name, number, wonGame,gameStarted });
  }

  handleName = (name)=> {
    db.set('name', name).write()
    this.setState({ name });
  }

  startGame = () =>{
    db.read();
    const randomNumber = this.generateRandomNumber();
    db.set('trials', []).write();
    db.set('gameStarted', true).write();
    db.set('wonGame', false).write();
    db.set('number', randomNumber).write();
    this.setState({ gameStarted: true, wonGame: false });
  }



  generateRandomNumber = () => {
    let digits = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 
    let numbers = [];
    for (let i = 0; i < 4; i++) {
      let randomDigit = _.sample(digits);
      numbers.push(randomDigit);
      _.remove(digits, (d) => {return d === randomDigit });
    }
    return parseInt(numbers.join('')); 
  }

  wonGame = () => {
    db.read();
    db.set('wonGame', true).write()
    this.setState({ wonGame: true });
  }


  
  render() {
    const { name, gameStarted, wonGame } = this.state;
    if (!name) return <EnterName handleName={this.handleName}/>
    if (wonGame) return <SuccessMessage startGame={this.startGame}/>
    if (!gameStarted) return <StartGame name={name} startGame={this.startGame} />
    return <Game wonGame={this.wonGame}/>;

  }
}

export default App
