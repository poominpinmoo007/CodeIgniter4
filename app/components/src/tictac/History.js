import React, { useEffect } from 'react';

const History=(props,onClick)=> {
  let winnerCheck ;
  const Datetime = new Date(props.date);
  let newDate =  `Date:${Datetime.getDate()}/${Datetime.getMonth()+1}/${Datetime.getFullYear()} | Time:${Datetime.getHours()}:${Datetime.getMinutes()}`;
  if(props.winner==0){
    winnerCheck ='X'
  }else{
    winnerCheck ='O'
  }

  return (
      <div class="btn-history" onClick={() => props.onClick()}>  
        <div class="size">Size:{props.size}</div>
        <div class="winner">Winner:{winnerCheck}</div>
        <div class="date">{newDate}</div>  
      </div> 
         
  );
}

export default History;