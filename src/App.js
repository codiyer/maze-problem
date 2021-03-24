import React from "react";
import "./App.css";
import Cell from "./Cell";

class App extends React.Component {
  constructor(props) {
    super(props);
    const greenSpriteCoords = props.greenSpriteCoords;

    const [rowMidPoint, colMidPoint] = props.midPoint;

    this.state = {
      greenSpriteCoords,
      redSpriteYCoord: rowMidPoint,
      redSpriteXCoord: colMidPoint,
    };

    this.noOfMoves = 0;

    this.handleGreenSprite = this.handleGreenSprite.bind(this);
    this.handleUpArrow = this.handleUpArrow.bind(this);
    this.handleRightArrow = this.handleRightArrow.bind(this);
    this.handleDownArrow = this.handleDownArrow.bind(this);
    this.handleLeftArrow = this.handleLeftArrow.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyPressed);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyPressed);
  }

  handleGreenSprite(x, y) {
    const greenSpriteCoords = this.state.greenSpriteCoords;
    const index = greenSpriteCoords.findIndex((coord) => coord.x === x && coord.y === y);

    if (index === -1) return;

    greenSpriteCoords.splice(index, 1);

    if (greenSpriteCoords.length === 0) {
      alert(`Yay! You did it in ${this.noOfMoves} moves`);
    }

    this.setState({
      greenSpriteCoords: [...greenSpriteCoords],
    });
  }

  handleUpArrow() {
    const redSpriteYCoord = this.state.redSpriteYCoord;
    const redSpriteXCoord = this.state.redSpriteXCoord;
    if (redSpriteYCoord === 0) return;

    this.noOfMoves++;

    const newCoord = redSpriteYCoord - 1;
    this.handleGreenSprite(redSpriteXCoord, newCoord);
    this.setState({
      redSpriteYCoord: newCoord,
    });
  }

  handleRightArrow() {
    const redSpriteYCoord = this.state.redSpriteYCoord;
    const redSpriteXCoord = this.state.redSpriteXCoord;
    if (redSpriteXCoord === this.props.noOfCols - 1) return;

    this.noOfMoves++;

    const newCoord = redSpriteXCoord + 1;
    this.handleGreenSprite(newCoord, redSpriteYCoord);
    this.setState({
      redSpriteXCoord: newCoord,
    });
  }

  handleDownArrow() {
    const redSpriteYCoord = this.state.redSpriteYCoord;
    const redSpriteXCoord = this.state.redSpriteXCoord;
    if (redSpriteYCoord === this.props.noOfRows - 1) return;

    this.noOfMoves++;

    const newCoord = redSpriteYCoord + 1;
    this.handleGreenSprite(redSpriteXCoord, newCoord);
    this.setState({
      redSpriteYCoord: newCoord,
    });
  }

  handleLeftArrow() {
    const redSpriteYCoord = this.state.redSpriteYCoord;
    const redSpriteXCoord = this.state.redSpriteXCoord;
    if (redSpriteXCoord === 0) return;

    this.noOfMoves++;

    const newCoord = redSpriteXCoord - 1;
    this.handleGreenSprite(newCoord, redSpriteYCoord);
    this.setState({
      redSpriteXCoord: newCoord,
    });
  }

  onKeyPressed(e) {
    const eventsToBeHandled = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

    const eventIndex = eventsToBeHandled.indexOf(e.key);
    if (eventIndex === -1) return;

    if (eventIndex === 0) {
      return this.handleUpArrow();
    }

    if (eventIndex === 1) {
      return this.handleRightArrow();
    }

    if (eventIndex === 2) {
      return this.handleDownArrow();
    }

    this.handleLeftArrow();
  }

  render() {
    const noOfRows = this.props.noOfRows;
    const noOfCols = this.props.noOfCols;
    const greenSpriteCoords = this.state.greenSpriteCoords;
    const redSpriteYCoord = this.state.redSpriteYCoord;
    const redSpriteXCoord = this.state.redSpriteXCoord;

    const board = [];
    for (let row = 0; row < noOfRows; row++) {
      const rowItems = [];
      for (let col = 0; col < noOfCols; col++) {
        const doesGreenSpriteExist = greenSpriteCoords.find(
          (coord) => coord.x === col && coord.y === row
        );
        const cell = (
          <Cell
            redX={redSpriteXCoord}
            redY={redSpriteYCoord}
            cellX={col}
            cellY={row}
            greenSprite={doesGreenSpriteExist != null}
          />
        );
        rowItems.push(cell);
      }
      board.push(<tr key={`row-${row}`}>{rowItems}</tr>);
    }

    return (
      <div className="App">
        <table>
          <tbody>{board}</tbody>
        </table>
      </div>
    );
  }
}
export default App;
