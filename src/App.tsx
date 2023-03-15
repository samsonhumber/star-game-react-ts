import React from 'react';
//import logo from './logo.svg';
import './App.css';
import GameConclusionDisplay from './components/conclusion-display/GameConclusionDisplay';
import GameArea from './components/game-area/GameArea';
import NumberKeyArea from './components/number-key-area/NumberKeyArea';
import NumberKey from './components/number-key/NumberKey';
import Timer from './components/timer/Timer';
import StarArea from './components/Star-Area/StarArea';
import ConclusionMessage from './components/conclusion-message/ConclusionMessage';
import PlayButton from './components/play-button/PlayButton';
import useNumKeys from './hooks/useNumKeys';


/* PLAN 
-- STRUCTURE --
  - h1 (title) 1
  - h3 (subtitle) 1
  - GameArea 2
    - StarArea 2
      - ul (maps a list of children)
        - Star 2
          - img (star image)?
      - GameConclusionDisplay (hidden at start) 2
        - ConclusionMessage 2
          - h1 (You Win | Game Over)
        - PlayButton 2
          - button (Play Again)
    - NumberKeyArea (could reuse/extend StarArea component) 2
        - NumberKey 2
          - div (coloured square)
  - Timer
    - h3 (Time left text) 2

-- STORY POINTS --
1. Plan structure by setting out components in files 
2. Write styling unit tests
3. Style components to pass tests
4. Write functionality unit tests 
5. Write preset and custom hooks to perform these
6. Pass the functionality unit tests  --INCOMPLETE--
7. Play-test the game in browser  --HERE--
8. Reflect on improvements and extensions to program or process

-- HOOKS and STATE --
- time --> Timer, NumberKeyArea (or could do isTimeLeft)
- hasWon --> NumberKeyArea, ConclusionMessage
- numOfStars --> StarArea, NumberKeyArea
- keyPressStatus --> numberKeyArea, StarArea
- onStartNewGame (event handler) --> PlayButton
- onNumKeyPress (event handler) -->
- I am going to want to write a function to compute all possible star numbers that are the sum of some combination of keypad numbers  --DONE--

- Refactor the components to take component arguments and prevent heavy prop drilling! --DONE--

-- RETROSPECTIVE --
- 14/03/23: The MVP program is complete in functionality
  - However, the development did not proceed to the original plan
    - This was because of introducing component composition (passing components as props) quite late in development
  - For the same reason, the planned test driven development was not followed completely
    - Most functions do not have functionality tests
  - What I can improve for next time is to commit to component composition from the start
    - It may also be good to write tests for the App.tsx file, so integration tests are available, even if the unit tests are no longer relevent
  - Another thing is that I probably have too many and too specific components
    - Again, commiting to using component composition to create a small number of generic components will remove this problem in the future
  - When I had bugs in my code, due to the many useEffects and hook functions, it proved very useful to remove much of the code and add functional features one piece at a time
    - This was only effective because the components already worked as static UI from earlier work
  
*/


export interface numKeyStatusType {
  id: number;
  status: 'notPicked' | 'pickedLessThanTarget' | 'pickedMoreThanTarget' | 'pickedLocked' | 'disabled';
}


function App() {
  const [time, hasWon, isPlaying, numKeysStatus, targetTotal, onNewGame, onNumKeyClick, useWinEffects, useTimeEffects] = useNumKeys();
  useWinEffects();
  useTimeEffects();  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Star Click Game in React</h1>
        <h3>Pick one or more numbers on the right to sum to the number of stars on the left</h3>
            {<GameArea leftSide={
                <StarArea
                nonPlayingUI={
                  <GameConclusionDisplay>
                    {<ConclusionMessage hasWon={hasWon}/>}   
                    {<PlayButton onPlay={onNewGame}/>}
                  </GameConclusionDisplay>
                  }
                numStars={targetTotal}
                isPlaying={isPlaying}/>
              } rightSide={
                <NumberKeyArea>{
                  numKeysStatus.map((numKeyObj: numKeyStatusType) => {
                    return <NumberKey key={numKeyObj.id} value={numKeyObj.id} status={numKeyObj.status} onNumKeyClick={onNumKeyClick}/>})
                }</NumberKeyArea>
              }/>
            }
        <Timer timeLeft={time}/>
      </header>
    </div>
  );
}

export default App;
