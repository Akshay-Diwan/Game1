
import './App.css';

import {Winner} from './Winner.js';
import { useState } from 'react';

import {Button} from './Button.js';
let isX = true;
function App() {
  
  const [disabled, setDisabled] = useState('disabled');
  const [history, setHistory] = useState([]);
    const [squares,setSquares] = useState(Array(9).fill(null));
   const [mode, setMode] = useState('light');
  
    function handleSquareClick(i) {
        const nextSquares = squares.slice();
       
        if(CheckWinner() !==null){

            return;
        }
        if(nextSquares[i] != null){
            return;
        }
        if(isX){
            nextSquares[i] = "X";
        }
        else{
        nextSquares[i] = "O";
        }
        isX = !isX;
        const temp = history;
        temp.push(squares);
        setHistory(temp);
        setDisabled('enabled');
        setSquares(nextSquares);
        CheckWinner();
       
       
      }
      function helper(i,j,k){
        if(squares[i] === squares[j] && squares[j] === squares[k] && squares[i] !== null){

            return [i, j, k];
        }
        return null;
      }
      function CheckWinner(){
         
        let ans = (helper(0,1,2) || helper(3, 4, 5) || helper(6, 7, 8) || helper(0,3,6) || helper(1,4,7) || helper(2,5,8) || helper(0, 4, 8) || helper(2, 4, 6));

        return ans;
      }
      function restartGame(){
        const nextSquares = Array(9).fill(null);
        isX=true;
        setHistory([]);
        setDisabled('disabled');
        setSquares(nextSquares);
        
      }
      function switchMode(){
        
        if(mode === 'light'){
          setMode('dark');
        }
        else{
          setMode('light');
        }

      }
      function undoMove(){
        if(history.length === 0){
          setDisabled('disabled');
        }
        else{
          let lastChange = history[history.length - 1];
        isX = !isX;
        setHistory(history.slice(0,history.length-1));
        setSquares(lastChange);
        if(history.length === 0){
          setDisabled('disabled');
        }
        }
        
        
      }
    return(
      <div className={"main " + mode} >
<label class="switch" >
  <input type="checkbox" onClick={switchMode}/>
  <span class="slider round"></span>
</label>
    <div className = " board " >
        <Button handleClick = {() => {handleSquareClick(0)}} value = {squares[0]} Mode ={mode}/>
        <Button handleClick = {() => {handleSquareClick(1)}} value = {squares[1]} Mode ={mode}/>
        <Button handleClick = {() => {handleSquareClick(2)}} value = {squares[2]} Mode ={mode}/>
        <Button handleClick = {() => {handleSquareClick(3)}} value = {squares[3]} Mode ={mode}/>
        <Button handleClick = {() => {handleSquareClick(4)}} value = {squares[4]} Mode ={mode}/>
        <Button handleClick = {() => {handleSquareClick(5)}} value = {squares[5]} Mode ={mode}/>
        <Button handleClick = {() => {handleSquareClick(6)}} value = {squares[6]} Mode ={mode}/>
        <Button handleClick = {() => {handleSquareClick(7)}} value = {squares[7]} Mode ={mode}/>
        <Button handleClick = {() => {handleSquareClick(8)}} value = {squares[8]} Mode ={mode}/>
        

    </div>
    <Winner status = {CheckWinner()?`Winner: ${isX?'O':'X'}`:`Turn: ${isX?'X':'O'}`}/>
    <div className='button-grp'>
    <button className='btns' onClick={restartGame}>Restart</button>
    <button className={`btns ${(disabled==='disabled'?'disabled':'')}`} onClick={undoMove}>Undo</button>
    </div>

    </div>
  );
}

export default App;
