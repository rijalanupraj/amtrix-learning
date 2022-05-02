import React, { useContext, useState } from 'react';
import MyContext from './utils/context';

function Counter() {
  const [num, setNum] = useState(1);
  const { sum, dispatch } = useContext(MyContext);
  // First render will create the state, and it will
  // persist through future renders

  return (
    <>
      <h1>{sum}</h1>
      <p>Hello</p>
      <>
        <input type='number' value={num} onChange={event => setNum(parseInt(event.target.value))} />
        <button onClick={() => dispatch({ type: 'ADD', payload: num })}>Add</button>
        <button onClick={() => dispatch({ type: 'SUB', payload: num })}>Subtract</button>
        <button onClick={() => dispatch({ type: 'MUL', payload: num })}>Multiply</button>
        <button onClick={() => dispatch({ type: 'DIV', payload: num })}>Divide</button>
      </>
    </>
  );
}

export default Counter;
