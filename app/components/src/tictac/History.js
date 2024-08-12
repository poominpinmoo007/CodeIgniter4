import React, { useEffect } from 'react';
import axios from 'axios';
const History=(props)=> {
  let winnerCheck ;
  const Datetime = new Date(props.date);
  let newDate =  `${Datetime.getDate()}/${Datetime.getMonth()+1}/${Datetime.getFullYear()}  |  ${Datetime.getHours()}:${Datetime.getMinutes()}`;
  if(props.winner==0){
    winnerCheck ='X'
  }else{
    winnerCheck ='O'
  }

  return (
      <div class="btn-history">  
        Size:{props.size} Winner:{winnerCheck} Time:{newDate}
      </div> 
         
  );
}

export default History;