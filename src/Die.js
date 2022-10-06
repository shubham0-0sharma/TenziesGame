import React from "react";

const Die = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white",
    };
    return (
        <div className="die-div" style={styles} onClick={props.holdDice}>
            <h2 className="die-h1">{props.dieNum}</h2>
        </div>
    );
};

export default Die;
