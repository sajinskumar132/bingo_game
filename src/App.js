import logo from "./logo.svg";
import "./App.css";
import BoxContainer from "./components/box_container/BoxContainer";
import { RandomNumberGenerator } from "./helpers/RandomNumberGenerator";
import { useEffect, useState } from "react";
import { FunctionalityHelpers } from "./helpers/FunctionalityHelpers";

function App() {
  const [userSequences, setUserSequences] = useState({
    randomNumbers: [],
    possibleWinSequences: [],
    selectedNumbers: [],
    selectedWinSequences: [],
  });

  const [botSequences, setBotSequences] = useState({
    randomNumbers: [],
    possibleWinSequences: [],
    selectedNumbers: [],
    selectedWinSequences: [],
  });

  const [BotNumber, setBotNumber] = useState(null);
  const [robotTurn, setRobotTurn] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  useEffect(() => {
    const {random_numbers: userRandomNumbers,possible_win_sequences: userPossibleWinSequences,} = RandomNumberGenerator.NumberGenerator(1, 25, 25);
      console.log(userRandomNumbers)
      setUserSequences({...userSequences,
        randomNumbers: userRandomNumbers,
        possibleWinSequences: userPossibleWinSequences,
        selectedNumbers: [],
        selectedWinSequences: [],
      });
      const {
        random_numbers: botRandomNumbers,
        possible_win_sequences: botPossibleWinSequences,
      } = RandomNumberGenerator.NumberGenerator(1, 25, 25);
      setBotSequences({
        ...botSequences,
        randomNumbers: botRandomNumbers,
        possibleWinSequences: botPossibleWinSequences,
        selectedNumbers: [],
        selectedWinSequences: [],
      });
  }, [gameStart]);

  useEffect(() => {
    if (gameStart) {
      const generatedNumber = RandomNumberGenerator.IndividualNumberGenerator(
        1,
        25,
        botSequences.selectedNumbers
      );
      setBotNumber(generatedNumber);
      updateSelectedNumber(false, generatedNumber);
    }
  }, [robotTurn, gameStart]);
  const updateSelectedNumber = (is_user, selected_number) => {
    const userSelectedWin = FunctionalityHelpers.CheckWinSequenceBySelectedItem(
      userSequences.selectedWinSequences,
      userSequences.possibleWinSequences,
      [...userSequences.selectedNumbers, selected_number]
    );
    setUserSequences({
      ...userSequences,
      selectedNumbers: [...userSequences.selectedNumbers, selected_number],
      selectedWinSequences: userSelectedWin,
    });

    const botSelectedWin = FunctionalityHelpers.CheckWinSequenceBySelectedItem(
      botSequences.selectedWinSequences,
      botSequences.possibleWinSequences,
      [...botSequences.selectedNumbers, selected_number]
    );
    setBotSequences({
      ...botSequences,
      selectedNumbers: [...botSequences.selectedNumbers, selected_number],
      selectedWinSequences: botSelectedWin,
    });
    if (userSelectedWin.length === 5) {
      setTimeout(() => {
        alert("User wins");
        setGameStart(false);
      }, 100);
      
      return;
    } else if (botSelectedWin.length === 5) {
      setTimeout(() => {
        alert("Robot wins");
        setGameStart(false);
      }, 100);
     
      return;
    }

    if (is_user) {
      setTimeout(() => {
        setRobotTurn(!robotTurn);
      }, 250);
    }
  };

  return (
    <div>
      <p className="main_title">Let's Play Bingo</p>
      <div className="app_main_container">
        <BoxContainer
          is_start={gameStart}
          sequences={userSequences}
          update_selected_number={updateSelectedNumber}
        />
        <BoxContainer
          is_start={gameStart}
          sequences={botSequences}
          update_selected_number={updateSelectedNumber}
          is_bot
          bot_generated_value={BotNumber}
        />
      </div>
      {!gameStart && (
        <div className="app_main_container">
        <button className="game_start_button" onClick={()=>{
                setGameStart(true)
              }}>Start</button>
        </div>
      )}
      
    </div>
  );
}

export default App;
