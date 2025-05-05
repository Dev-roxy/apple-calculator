import React, { useState } from 'react';
import './App.css';
import { evaluate } from 'mathjs';

function formatExpression(expression) {
  // Format the expression to be more user-friendly
  return expression.replace(/\*/g, '×').replace(/\//g, '÷');
  
}

function App() {
  const [output, setOutput] = useState("");
  const [expression, setExpression] = useState("");
  const [UserVisibleExpression, setUserVisibleExpression] = useState("")

  // Button data structure
  const buttons = [
    { label: 'AC', className: 'btn wide gray', value: "clear" },
    { label: '±', className: 'btn gray', value: "signChange" },
    // { label: '%', className: 'btn gray', value: "percent" },  // will be added soon
    { label: '÷', className: 'btn orange', value: "/" },
    
    { label: '7', className: 'btn', value: "7" },
    { label: '8', className: 'btn', value: "8" },
    { label: '9', className: 'btn', value: "9" },
    { label: '×', className: 'btn orange', value: "*" },
    
    { label: '4', className: 'btn', value: "4" },
    { label: '5', className: 'btn', value: "5" },
    { label: '6', className: 'btn', value: "6" },
    { label: '−', className: 'btn orange', value: "-" },
    
    { label: '1', className: 'btn', value: "1" },
    { label: '2', className: 'btn', value: "2" },
    { label: '3', className: 'btn', value: "3" },
    { label: '+', className: 'btn orange', value: "+" },
    
    { label: '0', className: 'btn wide', value: "0" },
    { label: '.', className: 'btn', value: "." },
    { label: '=', className: 'btn orange', value: "equals" },
];

  // Function to handle button clicks
  function handleClick(event) {
    const value = event.target.getAttribute('data-value');
    const label = event.target.getAttribute('data-label');


    if (value === "clear") {
      setOutput("");
      setExpression("");
      setUserVisibleExpression("");
    } else if (value === "signChange") {
      if (output) {
        console.log("output : ", output)
        const newOutput = output.toString().startsWith('-') ? output.toString().slice(1) : '-' + output.toString();
        setOutput(newOutput);
        setUserVisibleExpression(newOutput);
        setExpression(newOutput     );
      }
    } else if (value === "equals") {
      try {
        const result = evaluate(expression);
        setOutput(result);
        setUserVisibleExpression(result);
        setExpression(result.toString());
      } catch (error) {
        setOutput("Error");
        setUserVisibleExpression("Error");
      }
    } else {
      const newOutput = output + value;
      setOutput(newOutput);
      setUserVisibleExpression(formatExpression(newOutput));
      setExpression(expression + value);
    }
    
  }


  
  return (
    <div className="calculator">
      <div className="display"><span>{UserVisibleExpression || 0}</span></div>
      <div className="buttons">
        {buttons.map((btn, index) => (
          <button 
            key={index} 
           data-value={btn.value}
           data-label={btn.label}
          onClick={handleClick}
            className={btn.className}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;