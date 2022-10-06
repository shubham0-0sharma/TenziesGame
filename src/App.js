import { nanoid } from "nanoid";
import React from "react";
import Die from "./Die";
import Confetti from "react-confetti";

const App = () => {
    const [dice, setDice] = React.useState(() => newDice());
    const [tenziesWin , setTenziesWin] = React.useState(false)

    React.useEffect(
      ()=>{
        const allHeld = dice.every((die)=>die.isHeld)
        const firstValue = dice[0].value
        const allsameValue = dice.every(die => die.value === firstValue)
        if(allHeld && allsameValue){
          setTenziesWin(true)

      }
      }
      ,[dice])
    

    function genRandomNum() {
        return Math.ceil(Math.random() * 6);
    }

    function holdDice(id) {
        setDice((oldDice) =>
            oldDice.map((die) => {
                return die.id === id ? { ...die, "isHeld": !die.isHeld } : die;
            })
        );
    }
    function genNewDice(){
      return({
        id: nanoid(),
        value: genRandomNum(),
        isHeld: false,
    })
    }
    function newDice() {
        const newdie = [];
        for (let i = 0; i < 10; i++) {
            newdie.push(genNewDice());
        }

        return newdie;
    }
    function handleClickOnRoll() {

      if(!tenziesWin){
        setDice(oldDice=>oldDice.map(die=>
          {return (die.isHeld?die:genNewDice())
          }
          )
          )}
          else
          {
            setTenziesWin(false)
            setDice(newDice())
    }
    }

    const dieElem = dice.map((die) => (
        <Die
            key={die.id}
            dieNum={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ));

    return (
        <main>
          {tenziesWin && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="container">{dieElem}</div>
            <button 
                className="roll-dice" 
                onClick={handleClickOnRoll}
            >
                {tenziesWin ? "New Game" : "Roll"}
            </button>
        </main>
    );
};

export default App;
