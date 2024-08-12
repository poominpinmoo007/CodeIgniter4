import React, { useState,Component } from 'react';
import ReactDOM from 'react-dom';
import Game from './tictac/Game';

// import Board from './tictac/Board';

export default class Main extends Component {
  render() {
    return (
    <main class="container-fluid d-flex align-items-center justify-content-center row p-0 h-100">    
        <div class="d-flex flex-column align-items-center justify-content-center">
          <Game/>        
      </div>
      {/* <div class="h-75 history col-md-4 col-sm-12">
          <div> <h3>History</h3> </div>
          <div>
          <table>
            <History/>
          </table>
          </div>
          
      </div> */}
    </main>
    
    
      
    )
  }
}
let main_con = document.getElementById('main');
let main_com = <Main />;
ReactDOM.render(main_com, main_con);
