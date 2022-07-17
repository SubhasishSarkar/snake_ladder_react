import React from "react";
import Player from "./Player";

export default function Tile(props) {
    let tileType = "";

    if (props.num > props.to) {
        tileType = "S";
    } else if (props.num < props.to) {
        tileType = "L";
    }

    let players = props.players.map((player) => {
        return (
            <Player
                key={player.playerNum}
                number={player.playerNum}
                location={player.boardLocation}
            />
        );
    });

    return (
        <div className="tile">
            <div className="tile-number">{props.num}</div>

            <div className="tile-type">{tileType}</div>

            <div className="tile-players-container">{players}</div>
        </div>
    );
}
