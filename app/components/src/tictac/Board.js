import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const size = this.props.size;
    let board = [];
    for (let row = 0; row < size; row++) {
      let squares = [];
      for (let col = 0; col < size; col++) {
        squares.push(this.renderSquare(row * size + col));
      }
      board.push(
        <div key={row} class="d-flex flex-row">
          {squares}
        </div>
      );
    }

    return <div>{board}</div>;
  }
}

export default Board;