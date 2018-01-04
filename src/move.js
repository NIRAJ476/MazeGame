import React, { Component } from 'react';
import soldier from './image/soldier.png';
import king from './image/king.png';
import * as Random from './random.js';
import './app.css';

class Move extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: this.props.rows,
                   cols: this.props.cols,
                   soldiers: Math.floor((this.props.rows*this.props.cols)/6),
                   maze: [], posX: 0, posY: 0,
                   steps: 0,
                   gameEnd: false
                 };
           }
componentWillMount(){
    this.initMaze();
  }
initMaze(){
        let soldiersRows = Random.getSoldiersRowsPosition(this.state.soldiers, this.state.rows);
        let soldiersCols = Random.getSoldiersColsPosition(this.state.soldiers, this.state.cols);
        let maze = this.state.maze.slice();
        let soldiers = 0;
        for(let i =0; i < this.state.rows; i++ ){
          let row = [];
          for(let j =0; j < this.state.cols; j++ ){
            row.push(0);
          }
          maze.push(row);
        }
        for(let i = 0; i < this.state.soldiers; i++ ){
          let row = maze[soldiersRows[i]];
          let val = row[soldiersCols[i]]
          if(val === 0){
            row[soldiersCols[i]] = 1;
            soldiers = soldiers + 1;
          }
        }
        let row = maze[0];
        let val = row[0];
        if(val === 1){
          soldiers = soldiers - 1;
        }
        row[0] = 'K';
        this.setState({soldiers: soldiers, maze: maze,});
      }
getView(){
    let table = this.getTable();
    let gameEnd = this.state.gameEnd;
    return <div className="maze">
               <p><b> {this.state.steps}</b>{gameEnd ? ' Steps taken by the King to save princess' : ''}</p>
               <table className="table">
                   {table}
               </table>
               {!gameEnd &&
                   <div className="keys">
                        <button className="button" name="top" onClick={(e)=>this.controls(e)}>&#9650;</button>
                        <div>
                            <button className="button" name="left" onClick={(e)=>this.controls(e)}>&#9668;</button>
                            <button className="button" name="right" onClick={(e)=>this.controls(e)}>&#9658;</button>
                       </div>
                       <button className="button" name="down" onClick={(e)=>this.controls(e)}>&#9660;</button>
                   </div>
                   }
               {gameEnd &&
                  <div className="keys">
                    <button className="play" onClick={()=>this.resetMaze()}>Play Again</button>
                  </div>
                }
            </div>
    }
getTable(){
    let table = [];
    let maze = this.state.maze.slice();
    for (let i = 0; i < this.state.rows ; i++){
      let data = [];
      let row = maze[i];
      if(row){
        for (let j = 0; j < this.state.cols ; j++){
          let x = null
          if(row[j] === 1)
            x = <img className="image" src={soldier} />;
          if(row[j] === 'K')
            x = <img className="image" src={king} />;
          data.push(<td className="data">{x}</td>);
        }
        table.push(<tbody><tr>{data}</tr></tbody>);
      }
    }
    return table;
  }
controls(event){
    let action;
    if(event.target){
      action = event.target.name;
    }
    let gameEnd = this.state.gameEnd;
    if(!gameEnd){
      let rows = this.state.rows;
      let cols =this.state.cols;
      let soldiers = this.state.soldiers;
      let maze = this.state.maze.slice();
      let steps = this.state.steps;
      let posX = this.state.posX;
      let posY = this.state.posY;
      let changed = false;
      if(action === 'top'){
        if((posX-1) >= 0 ){
          let row = maze[posX];
          row[posY] = 0;
          posX = posX - 1;
          row = maze[posX];
          let val = row[posY];
          if(val === 1){
            soldiers = soldiers - 1;
            if(soldiers === 0){
              gameEnd = true;
            }
          }
          row[posY] = 'K';
          changed = true;
        }
      }
      if(action === 'left'){
        if((posY-1) >= 0){
          let row = maze[posX];
          row[posY] = 0;
          posY = posY - 1;
          let val = row[posY];
          if(val === 1){
            soldiers = soldiers - 1;
            if(soldiers === 0){
              gameEnd = true;
            }
          }
          row[posY] = 'K';
          changed = true;
        }
      }
      if(action === 'right'){
        if((posY+1) < cols){
          let row = maze[posX];
          row[posY] = 0;
          posY = posY + 1;
          let val = row[posY];
          if(val === 1){
            soldiers = soldiers - 1;
            if(soldiers === 0){
              gameEnd = true;
            }
          }
          row[posY] = 'K';
          changed = true;
        }
      }
      if(action === 'down'){
        if((posX+1) < rows){
          let row = maze[posX];
          row[posY] = 0;
          posX = posX + 1;
          row = maze[posX];
          let val = row[posY];
          if(val === 1){
            soldiers = soldiers - 1;
            if(soldiers === 0){
              gameEnd = true;
            }
          }
          row[posY] = 'K';
          changed = true;
        }
      }
      if(changed){
        steps = steps + 1;
        this.setState(prevState => ({
          maze : maze,
          soldiers: soldiers,
          posX: posX,
          posY: posY,
          steps: steps,
          gameEnd : gameEnd
        }));
      }
    }
  }
render() {
      let ui = this.getView();
      return (
        <div>{ui}</div>
      );
    }
resetMaze(){
    this.props.resetMaze();
  }
}
export default Move;
