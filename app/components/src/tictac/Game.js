import React,{ useEffect } from 'react';
import Board from './Board';
import axios from 'axios';
import History from './History';
  
class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      size: 3,
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      historys:[]
    }
  }

  componentDidMount() {
    this.loadGameHistory(); // เรียกใช้ loadGameHistory เมื่อคอมโพเนนต์ถูกโหลด
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares, this.state.size) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState(
      {
        history: history.concat([
          {
            squares: squares,
          },
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      },     
    );
  }

  handleSizeChange(event) {
    const size = parseInt(event.target.value, 10);
    this.setState({
      size: size,
      history: [
        {
          squares: Array(size * size).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    });
  }

  resetGame() {
    const size = this.state.size;
    this.btn_status.history = false; 
    this.btn_status.disabled=true;
    this.setState({
      history: [
        {
          squares: Array(size * size).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    });
  }

  saveGameHistory() {
    // ส่งข้อมูลประวัติการเล่นไปยังเซิร์ฟเวอร์หรือฐานข้อมูล
    let Next;
    if(this.state.xIsNext == true){
      Next = 1
    }else{
      Next = 0
    }
    let gameData = {
      size: this.state.size,
      history: JSON.stringify(this.state.history),
      step:this.state.stepNumber ,
      winner: Next,
    };
    console.log(gameData)

    axios.post('http://localhost:8080/api/tic_tac_toe/save',gameData)
    .then(response =>{
      alert('Saved')
      gameData={}
      this.resetGame()      
    })
    .catch(error=>{
      alert('Erroe: '+error)
    })
    this.btn_status.disabled = true; 
    this.loadGameHistory()
  }

  loadGameHistory() {
    axios.get('http://localhost:8080/api/tic_tac_toe/history')
    .then(response =>{
      this.setState({historys:response.data.data})
      console.log(response.data.data);
    })
    .catch(error=>{
      console.log('Error = '+error);
    })
    console.log('setState')
  }

  btn_status={
    disabled : true,
    history:false
  }

  set_history(size, history, step, winner) {
    const parsedHistory = typeof history === 'string' ? JSON.parse(history) : history;
    this.setState({
        size: size,
        history: parsedHistory,
        stepNumber: step,
        xIsNext: winner,
    });
    this.btn_status.history = true; 
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares, this.state.size);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
      console.log(this.btn_status.history,this.btn_status.disabled)
      if(this.btn_status.history==true){
        this.btn_status.disabled=true
      }else{
        this.btn_status.disabled=false
      }
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div class="row container-fluid p-0 d-flex align-items-center justify-contant-center">
        <div class="col-md-3 col-sm-12"></div>
        <div class="d-flex align-items-center justify-contant-center flex-column col-md-5 col-sm-12">
        <div class="d-flex flex-column align-items-center justify-content-center">
            <h1 class="fontstyle"><i class="fa-solid fa-x color_x"></i> Tec Tac Toe <i class="fa-solid fa-o color_o"></i></h1> 
            <h5 class="fontstyle"> <span class="react">React js</span> and <span class="codeig">Codeigniter4</span></h5>
        </div> 
        <div class="d-flex align-items-center justify-contant-center m-1">
          <h3 class="fontstyle">Size: </h3>
            
            <select
              class="form-select form-select-sm ms-1"
              value={this.state.size}
              onChange={(e) => this.handleSizeChange(e)}
            >
              <option value="3">3x3</option>
              <option value="4">4x4</option>
              <option value="5">5x5</option>
            </select>
                   
        </div>
        <div class="d-flex align-items-center justify-contant-center flex-column m-2">
          <Board
            squares={current.squares}
            size={this.state.size}
            onClick={(i) => this.handleClick(i)}
          />
        </div>       
        <div class="d-flex align-items-center justify-contant-center flex-column">
          <div>
            <h3 class="fontwinner">
              {status}
            </h3>            
          </div>         
        </div>
        <div class="m-1 d-flex flex-column">
          <button class="btn btn-primary my-2" onClick={() => this.resetGame()}><i class="fa-solid fa-rotate-right"></i> Reset Game</button>
          <button class="btn btn-success " disabled={this.btn_status.disabled} onClick={() => this.saveGameHistory()}><i class="fa-regular fa-floppy-disk"></i> Save</button>
        </div>
      </div>
      <div class="container-fluid  col-md-4 col-sm-12 d-flex align-items-center justify-contant-center flex-column">
        <div> <h3 class="fontstyle">History</h3> </div>
        <div class="p-2 history table-responsive">
          
        <div class="container-fluid d-flex align-items-center justify-contant-center p-2 ">
          <div class="table_over">
          {this.state.historys.map((data)=>{
            return <History size={data.size} winner={data.winner} date={data.date} onClick={()=>{this.set_history(data.size, data.history, data.step, data.winner)}} />
          })}
            
          </div>
        </div>
        </div>        
      </div>
      </div>
      
    );
  }
}

function calculateWinner(squares, size) {
  const lines = [];

  for (let i = 0; i < size; i++) {
    const row = [];
    const col = [];
    for (let j = 0; j < size; j++) {
      row.push(i * size + j);
      col.push(j * size + i);
    }
    lines.push(row);
    lines.push(col);
  }

  const diag1 = [];
  const diag2 = [];
  for (let i = 0; i < size; i++) {
    diag1.push(i * size + i);
    diag2.push(i * size + (size - i - 1));
  }
  lines.push(diag1);
  lines.push(diag2);

  for (let i = 0; i < lines.length; i++) {
    const [a, b, ...rest] = lines[i];
    if (squares[a] && squares[a] === squares[b] && rest.every((index) => squares[a] === squares[index])) {
      return squares[a];
    }
  }
  return null;
}

export default Game;