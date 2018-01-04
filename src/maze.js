import React, { Component } from 'react';
import Move from './move.js'
import './app.css';

class Maze extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: 0,
                   cols: 0,
                   gameOn: false,
                   error: false
                 };
    this.submit = this.submit.bind(this);
    this.getMaze = this.getMaze.bind(this);
    this.resetMaze = this.resetMaze.bind(this);
  }

submit(event) {
    event.preventDefault();
    var row = this.state.rows;
    var column = this.state.cols;
    if(row > 2 && column > 2){
      this.setState({gameOn: true});
    }
    else{
      this.setState({error: true});
    }
    return false;
  }
getMaze(){
    var gameOn = this.state.gameOn;
    var err  = this.state.error;
    if(gameOn){
      return <div className="table"><Move resetMaze={this.resetMaze} rows={this.state.rows} cols={this.state.cols} /></div>
    }
    else{
       return <div className="input">
                {err &&
                  <p>Rows & Cols Should be greater than 4</p>
                }
                <form >
                <p>Number of rows</p>
                  <input type='number'
                         onChange={event=>this.setState({rows:event.target.value})}
                  />
                  <p>Number of columns</p>
                  <input type="number"
                         onChange={event=>this.setState({cols:event.target.value})}
                  />
                  <p>
                    <button className="submit"
                            onClick={this.submit}
                    >
                    Submit
                    </button>
                  </p>
                </form>
              </div>;
    }
  }
render() {
      let ui = this.getMaze();
      return (
        <div className="main">
            <p className="title">Save Princess Maze Game</p>
          <div className="maze">
            {ui}
          </div>
        </div>
      );
    }
resetMaze(e){
    this.setState(prevState => ({rows: 0, cols: 0, gameOn: false, error: false }));
  }
}
export default Maze;
