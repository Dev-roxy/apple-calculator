import React, { useState } from 'react';

function App() {
  const [output, setOutput] = useState("");
  const [expression, setExpression] = useState("");
  const [UserVisibleExpression, setUserVisibleExpression] = useState("")

  const handleClick = (e) => {
    const button = e.target;
    let value = button.innerText;
  
    if (value === 'AC') {
      setOutput('');
      setExpression('');
      setUserVisibleExpression("");
      
    } else if (value === '=') {
      try {
        console.log(expression)
        const result = eval(expression);
        setOutput(result.toString());
        setUserVisibleExpression(output)
        setExpression(result.toString());
      } catch (error) {
        alert(error.message);
      }
    } else if (value === '±') {
      console.log(UserVisibleExpression)
      console.log(value)
      if (UserVisibleExpression[0] === '−' && UserVisibleExpression[1] === '(' && UserVisibleExpression[UserVisibleExpression.length - 1] === ')') {
        setUserVisibleExpression(UserVisibleExpression.slice(2, UserVisibleExpression.length - 1));
      } else {
        setUserVisibleExpression(`-(${UserVisibleExpression})`);
      }
      setExpression(`${expression}* (-1)`);
      
    } else {
      setUserVisibleExpression(prevExpression => `${prevExpression}${value}`);
      if (value === '−'){
        setExpression(prevExpression => `${prevExpression}-`);
      }else if (value === '×'){
        setExpression(prevExpression => `${prevExpression}*`);
      }else if (value === '÷'){
        setExpression(prevExpression => `${prevExpression}/`);
      }else{
        setExpression(prevExpression => `${prevExpression}${value}`);
      }
      

    }
  };
  

  return (
    <div className="calculator">
      <div className="display">{UserVisibleExpression || 0}</div>
      <div className="buttons">
        <button onClick={handleClick} className="btn wide gray">AC</button>
        <button onClick={handleClick} className="btn gray">±</button>
        {/* <button onClick={handleClick} className="btn gray">%</button> */}
        <button onClick={handleClick} className="btn orange">÷</button>

        <button onClick={handleClick} className="btn">7</button>
        <button onClick={handleClick} className="btn">8</button>
        <button onClick={handleClick} className="btn">9</button>
        <button onClick={handleClick} className="btn orange">×</button>

        <button onClick={handleClick} className="btn">4</button>
        <button onClick={handleClick} className="btn">5</button>
        <button onClick={handleClick} className="btn">6</button>
        <button onClick={handleClick} className="btn orange">−</button>

        <button onClick={handleClick} className="btn">1</button>
        <button onClick={handleClick} className="btn">2</button>
        <button onClick={handleClick} className="btn">3</button>
        <button onClick={handleClick} className="btn orange">+</button>

        <button onClick={handleClick} className="btn wide">0</button>
        <button onClick={handleClick} className="btn">.</button>
        <button onClick={handleClick} className="btn orange">=</button>
      </div>
    </div>
  );
}

export default App;