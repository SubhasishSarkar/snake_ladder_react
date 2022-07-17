import React from 'react'
import Tile from './Tile'
import { snakes } from '../snakes';
import { ladders } from '../ladders'
export default function Board(props) {

    const renderBoard = () => {
        let tileNum = 1;
        let tiles = [];

        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                tiles.push({
                    row: i,
                    col: j,
                    num: tileNum,
                    to: tileNum,
                    players: []
                })
                tileNum++;
            }
        }
        snakes.map(snake => {
            tiles[snake.from - 1].to = snake.to;
        })
        ladders.map(ladders => {
            tiles[ladders.from - 1].to = ladders.to;
        })

        props.players.map((player) => {
            tiles[player.boardLocation - 1].players.push(player);

            let toGo = tiles[player.boardLocation - 1].to;

            if (tiles[player.boardLocation - 1].to !== tiles[player.boardLocation - 1].num) {
                props.movePlayer(player.playerNum, toGo);
            }
        })
        return tiles;
    }

    let boardTiles = renderBoard(snakes, ladders);
    let lastActionText = "Press roll to play";
    if (props.lastRoll !== 0) {
        lastActionText = "Rolled a " + props.lastRoll;
    }

    let tiles = boardTiles.map((tile) => {
        return (
            <Tile
                row={tile.row}
                col={tile.col}
                num={tile.num}
                to={tile.to}
                players={tile.players}
                key={tile.num}
            />
        );
    });

    return (
        <div>
            <div className="board-header">
                <div className="player-turn">Current Turn: Player {props.turn}</div>

                <div className="last-action">{lastActionText}</div>

                <button className="roll-dice" onClick={() => props.rollDice()}>
                    Roll
                </button>
            </div>
            <div className="board">{tiles}</div>
        </div>
    )
}
