import React from 'react';

const Square=(props)=> {
  return (
    <button class="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;