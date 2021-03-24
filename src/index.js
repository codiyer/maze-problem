import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const noOfCols = prompt("Enter the board width");
const noOfRows = prompt("Enter the board height");

const rowMidPoint = Math.floor(noOfRows / 2);
const colMidPoint = Math.floor(noOfCols / 2);

const greenSpriteCoords = [];

while (greenSpriteCoords.length < Math.min(noOfRows, noOfCols)) {
  const xCoord = Math.floor(Math.random() * noOfCols);
  const yCoord = Math.floor(Math.random() * noOfRows);

  if (xCoord === rowMidPoint && yCoord === colMidPoint) continue;

  const doesExist = greenSpriteCoords.find((coord) => coord.x === xCoord && coord.y === yCoord);

  if (doesExist) continue;

  greenSpriteCoords.push({ x: xCoord, y: yCoord });
}

ReactDOM.render(
  <React.StrictMode>
    <App
      noOfCols={noOfCols}
      noOfRows={noOfRows}
      greenSpriteCoords={greenSpriteCoords}
      midPoint={[rowMidPoint, colMidPoint]}
    />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
