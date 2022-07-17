import React, { Component } from 'react'
import Board from './Board'
export default class SnakeAndLadder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gameStarted: false,
            end: false,
            playerCount: 2,
            players: [],
            playerTurn: 1,
            lastRoll: 0
        }
    }

    startGame(count) {
        let players = []
        for (let i = 1; i <= count; i++) {
            players.push({
                playerNum: i,
                boardLocation: 1
            })
        }

        this.setState({
            players: players,
            gameStarted: true,
            playerCount: count
        })
    }
    playAgain() {
        this.setState({
            gameStarted: false,
            end: false,
            playerCount: 2,
            players: [],
            playerTurn: 1,
            lastRoll: 0
        })
    }
    rollDice() {
        let rolledNumber = Math.floor(Math.random() * 6) + 1;
        let players = this.state.players.slice();

        let nextTurn = this.state.playerTurn + 1;
        if (nextTurn > this.state.players.length)
            nextTurn = 1;

        const position = players[this.state.playerTurn - 1].boardLocation + rolledNumber;

        if (position === 100) {
            this.setState({
                end: true
            })
        } else if (position > 100) {
            rolledNumber = "Number exceeds 100";
            this.setState({
                playerTurn: nextTurn
            })
        } else {
            players[this.state.playerTurn - 1].boardLocation += rolledNumber;
            this.setState({ playerTurn: nextTurn });
        }
        this.setState({
            players: players,
            lastRoll: rolledNumber
        });
    }
    movePlayer(playerId, location) {
        let players = this.state.players.slice();
        console.log(players, playerId)
        players[playerId - 1].boardLocation = location;
        this.setState({ players: players });
    }

    render() {
        console.log(this.state)
        if (this.state.gameStarted) {
            return (<Board
                players={this.state.players}
                turn={this.state.playerTurn}
                lastRoll={this.state.lastRoll}
                playAgain={this.playAgain.bind(this)}
                rollDice={this.rollDice.bind(this)}
                movePlayer={this.movePlayer.bind(this)}
            />)
        } else if (this.state.end) {
            return (
                <div className="victory-message-container">
                    <h1 className="victory-message">
                        Player {this.state.playerTurn} wins!
                    </h1>
                    <button onClick={this.playAgain.bind(this)}>Play Again</button>
                </div>
            );
        } else {
            return (
                <div>
                    <button onClick={() => this.startGame(2)}>START</button>
                </div>
            )
        }

    }
}
